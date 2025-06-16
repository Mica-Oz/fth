import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Make sure this is installed: npm install @google/generative-ai

export async function POST(req: Request) {
  // It's good practice to explicitly check the method,
  // though Next.js App Router handles this by function name (POST).
  if (req.method !== "POST") {
    return new NextResponse(null, {
      status: 405,
      statusText: "Method Not Allowed",
    });
  }

  try {
    // IMPORTANT: Your API key should be an environment variable.
    // It MUST NOT be prefixed with NEXT_PUBLIC_ as it's server-side only.
    const API_KEY = process.env.GEMINI_API_KEY;

    if (!API_KEY) {
      console.error(
        "Server Error: GEMINI_API_KEY environment variable is not set!"
      );
      return NextResponse.json(
        { error: "Server configuration error. Please try again later." },
        { status: 500 }
      );
    }

    // Parse the request body coming from your frontend
    const requestBodyFromClient = await req.json();
    console.log(
      "Backend: Incoming request body from client:",
      requestBodyFromClient
    );

    // Basic validation of the incoming request body
    // Ensure 'contents' (your chat history) is present and an array
    if (
      !requestBodyFromClient ||
      !Array.isArray(requestBodyFromClient.contents)
    ) {
      return NextResponse.json(
        { error: "Invalid request body. 'contents' array is required." },
        { status: 400 }
      );
    }

    // Initialize the Google Generative AI SDK with your API key
    const genAI = new GoogleGenerativeAI(API_KEY);
    // Get the Generative Model instance
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Make the content generation request to the Gemini API using the SDK
    const result = await model.generateContent({
      contents: requestBodyFromClient.contents, // Use the chat history directly from the client's request
    });

    // Get the response object from the Gemini API call
    const apiResponse = await result.response;

    // Extract the actual text content from the Gemini API response
    // The .text() method from the SDK correctly pulls out the string content.
    const botTextContent = apiResponse.text();

    console.log("Backend: Extracted bot text content:", botTextContent);

    // Optional: Further clean or format the text if needed (e.g., stripping more markdown)
    // For example, if you want to remove all bold markdown like "**text**"
    // const cleanedBotTextContent = botTextContent.replace(/\*\*(.*?)\*\*/g, '$1').trim();

    // Return the extracted (and optionally cleaned) text to the frontend
    // The frontend expects this to be in a 'botResponse' field.
    return NextResponse.json({ botResponse: botTextContent }, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Log detailed error information on the server side for debugging
    console.error("Backend: Error calling Gemini API or processing request:");

    let statusCode = 500;
    let errorMessage = "An unexpected server error occurred. Please try again.";

    // Check if it's an error from the Google Generative AI SDK (or underlying network issue)
    if (error.response && error.response.status) {
      // If the error object has a 'response' with a 'status', it's likely an HTTP error from Gemini
      statusCode = error.response.status;
      if (statusCode === 429) {
        errorMessage =
          "Our services are experiencing high traffic. Please try again in a moment.";
      } else if (statusCode >= 400 && statusCode < 500) {
        // Attempt to extract a more specific error message from Gemini's response body
        errorMessage =
          error.response.data?.error?.message || `API error: ${error.message}`;
      } else {
        errorMessage = `An external service error occurred: ${error.message}`;
      }
    } else if (error instanceof Error) {
      // General JavaScript error (e.g., network issue before reaching API, parsing error)
      errorMessage = `Internal server error: ${error.message}`;
    }

    // Log the specific error details that led to this catch
    console.error("Error details:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
      // For SDK errors, 'error.response' might contain more details
      responseStatus: error.response?.status,
      responseData: error.response?.data,
    });

    // Return a structured error response to the client
    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
