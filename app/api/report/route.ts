import { NextRequest, NextResponse } from "next/server";
import S3 from "aws-sdk/clients/s3";

const s3 = new S3({
  apiVersion: "2006-03-01",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  signatureVersion: "v4",
});

export async function GET(req: NextRequest) {
  try {
    const id = req.headers.get("caseID");

    if (!id) {
      return NextResponse.json(
        { error: "Case ID is required" },
        { status: 400 }
      );
    }

    const Key = `${id}.pdf`;
    const Bucket = process.env.AWS_BUCKET_NAME;

    // Runtime checks
    if (!Bucket) {
      return NextResponse.json(
        { error: "Bucket name not configured" },
        { status: 500 }
      );
    }

    if (!Key) {
      return NextResponse.json({ error: "Invalid key" }, { status: 400 });
    }

    // Now TypeScript knows Bucket and Key are strings
    try {
      await s3.headObject({ Bucket, Key }).promise();
    } catch (err: unknown) {
      if (
        err &&
        typeof err === "object" &&
        "code" in err &&
        err.code === "NotFound"
      ) {
        return NextResponse.json(
          { error: "Report not found" },
          { status: 404 }
        );
      }
      // Other errors
      return NextResponse.json(
        { error: "Error checking file" },
        { status: 500 }
      );
    }

    //  Check if the file exists in S3
    try {
      await s3.headObject({ Bucket, Key }).promise(); // headObject throws if file doesn't exist
    } catch (err: unknown) {
      if (
        err &&
        typeof err === "object" &&
        "code" in err &&
        err.code === "NotFound"
      ) {
        return NextResponse.json(
          { error: "Report not found" },
          { status: 404 }
        );
      }

      // Other S3-specific errors
      console.error("S3 headObject error:", err);
      return NextResponse.json(
        { error: "Error checking file existence" },
        { status: 500 }
      );
    }

    // ✅ File exists — generate signed URL
    const s3Params = {
      Bucket,
      Key,
      Expires: 60,
      ResponseContentType: "application/pdf",
      ResponseContentDisposition: 'inline; filename="report.pdf"',
    };

    const uploadURL = await s3.getSignedUrlPromise("getObject", s3Params);

    return NextResponse.json({ data: { uploadURL, key: Key } });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
// Note: This code assumes you have the AWS SDK configured and the necessary environment variables set up.
