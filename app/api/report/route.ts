import { NextRequest, NextResponse } from "next/server";
import S3 from "aws-sdk/clients/s3";

const s3 = new S3({
  apiVersion: "2006-03-01",
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
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
    const s3Params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key,
      Expires: 60,
      ResponseContentType: "application/pdf",
      ResponseContentDisposition: 'inline; filename="report.pdf"',
    };

    const uploadURL = await s3.getSignedUrl("getObject", s3Params);

    return NextResponse.json({ data: { uploadURL, key: Key } });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
