/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Helper function to extract and clean the latest user message
function extractLatestUserMessage(contents: any[]): string | null {
  // Find the last user message in the conversation
  for (let i = contents.length - 1; i >= 0; i--) {
    const content = contents[i];
    if (content.role === "user" && content.parts && content.parts.length > 0) {
      // Extract text from parts array
      const textParts = content.parts
        .filter((part: any) => part.text)
        .map((part: any) => part.text)
        .join(" ");

      if (textParts) {
        // Clean up common prompt prefixes
        const cleanedMessage = textParts
          .replace(
            /^Using the details provided above,?\s*please address this query:\s*/i,
            ""
          )
          .replace(/^Please address this query:\s*/i, "")
          .replace(/^Query:\s*/i, "")
          .trim();

        return cleanedMessage || textParts; // Fallback to original if cleaning results in empty string
      }
    }
  }
  return null;
}

// Helper function to analyze conversation metrics
function analyzeConversation(contents: any[]) {
  const userMessages = contents.filter((c) => c.role === "user").length;
  const modelMessages = contents.filter((c) => c.role === "model").length;
  const totalTurns = contents.length;

  return {
    userMessageCount: userMessages,
    modelMessageCount: modelMessages,
    totalTurns,
    conversationLength: totalTurns,
    isNewConversation: totalTurns <= 2, // First user message + first model response
    conversationType:
      totalTurns <= 2
        ? "new"
        : totalTurns <= 6
        ? "short"
        : totalTurns <= 12
        ? "medium"
        : "long",
  };
}

export async function POST(req: Request) {
  const startTime = Date.now();

  if (req.method !== "POST") {
    return new NextResponse(null, {
      status: 405,
      statusText: "Method Not Allowed",
    });
  }

  try {
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

    // Parse the request body
    const requestBodyFromClient = await req.json();

    // Extract analytics data
    const latestUserMessage = extractLatestUserMessage(
      requestBodyFromClient.contents || []
    );
    const conversationMetrics = analyzeConversation(
      requestBodyFromClient.contents || []
    );

    // Log structured conversation start
    console.log(
      "CHAT_REQUEST_START",
      JSON.stringify({
        timestamp: new Date().toISOString(),
        userMessage: latestUserMessage,
        conversationMetrics,
        requestMetadata: {
          hasContents: !!requestBodyFromClient.contents,
          contentsLength: requestBodyFromClient.contents?.length || 0,
        },
      })
    );

    // Validate request
    if (
      !requestBodyFromClient ||
      !Array.isArray(requestBodyFromClient.contents)
    ) {
      console.log(
        "CHAT_REQUEST_ERROR",
        JSON.stringify({
          timestamp: new Date().toISOString(),
          error: "Invalid request body",
          userMessage: latestUserMessage,
        })
      );

      return NextResponse.json(
        { error: "Invalid request body. 'contents' array is required." },
        { status: 400 }
      );
    }

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Make API call to Gemini
    const geminiStartTime = Date.now();
    const result = await model.generateContent({
      contents: requestBodyFromClient.contents,
    });
    const geminiDuration = Date.now() - geminiStartTime;

    const apiResponse = await result.response;
    const botTextContent = apiResponse.text();

    // Log structured conversation completion
    console.log(
      "CHAT_REQUEST_SUCCESS",
      JSON.stringify({
        timestamp: new Date().toISOString(),
        userMessage: latestUserMessage,
        botResponse: botTextContent,
        conversationMetrics,
        performance: {
          totalDuration: Date.now() - startTime,
          geminiApiDuration: geminiDuration,
          responseLength: botTextContent.length,
        },
        metadata: {
          model: "gemini-1.5-flash",
          status: "success",
        },
      })
    );

    return NextResponse.json({ botResponse: botTextContent }, { status: 200 });
  } catch (error: any) {
    const errorDuration = Date.now() - startTime;

    // Extract user message even in error cases
    let latestUserMessage = null;
    try {
      const requestBodyFromClient = await req.json().catch(() => ({}));
      latestUserMessage = extractLatestUserMessage(
        requestBodyFromClient.contents || []
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      // Ignore parsing errors in error handler
    }

    let statusCode = 500;
    let errorMessage = "An unexpected server error occurred. Please try again.";

    // Enhanced error handling
    if (error.response && error.response.status) {
      statusCode = error.response.status;
      if (statusCode === 429) {
        errorMessage =
          "Our services are experiencing high traffic. Please try again in a moment.";
      } else if (statusCode >= 400 && statusCode < 500) {
        errorMessage =
          error.response.data?.error?.message || `API error: ${error.message}`;
      } else {
        errorMessage = `An external service error occurred: ${error.message}`;
      }
    } else if (error instanceof Error) {
      errorMessage = `Internal server error: ${error.message}`;
    }

    // Log structured error
    console.log(
      "CHAT_REQUEST_ERROR",
      JSON.stringify({
        timestamp: new Date().toISOString(),
        userMessage: latestUserMessage,
        error: {
          message: errorMessage,
          status: statusCode,
          name: error.name,
          stack: error.stack,
        },
        performance: {
          failureDuration: errorDuration,
        },
        metadata: {
          model: "gemini-1.5-flash",
          status: "error",
        },
      })
    );

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
