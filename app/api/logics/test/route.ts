import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  const API_URL = "https://freetaxhistory.logiqs.com/publicapi/V4/Case/GetCasesByStatus";
  const API_KEY = process.env.LOGICS_API_KEY;
  const testStatusId = 183; // Status 1.1

  const results: Record<string, unknown> = {};

  // Try 1: StatusID as header (current implementation)
  try {
    const response1 = await axios.get(API_URL, {
      params: { apikey: API_KEY },
      headers: { StatusID: testStatusId.toString() },
    });
    results.asHeader = {
      status: response1.status,
      dataLength: Array.isArray(response1.data) ? response1.data.length : "not array",
      sample: Array.isArray(response1.data) ? response1.data.slice(0, 2) : response1.data,
    };
  } catch (error) {
    results.asHeader = { error: (error as Error).message };
  }

  // Try 2: StatusID as query param
  try {
    const response2 = await axios.get(API_URL, {
      params: { apikey: API_KEY, StatusID: testStatusId },
    });
    results.asQueryParam = {
      status: response2.status,
      dataLength: Array.isArray(response2.data) ? response2.data.length : "not array",
      sample: Array.isArray(response2.data) ? response2.data.slice(0, 2) : response2.data,
    };
  } catch (error) {
    results.asQueryParam = { error: (error as Error).message };
  }

  // Try 3: StatusID as query param with lowercase
  try {
    const response3 = await axios.get(API_URL, {
      params: { apikey: API_KEY, statusid: testStatusId },
    });
    results.asLowercaseParam = {
      status: response3.status,
      dataLength: Array.isArray(response3.data) ? response3.data.length : "not array",
      sample: Array.isArray(response3.data) ? response3.data.slice(0, 2) : response3.data,
    };
  } catch (error) {
    results.asLowercaseParam = { error: (error as Error).message };
  }

  // Try 4: POST instead of GET
  try {
    const response4 = await axios.post(API_URL, { StatusID: testStatusId }, {
      params: { apikey: API_KEY },
    });
    results.asPost = {
      status: response4.status,
      dataLength: Array.isArray(response4.data) ? response4.data.length : "not array",
      sample: Array.isArray(response4.data) ? response4.data.slice(0, 2) : response4.data,
    };
  } catch (error) {
    results.asPost = { error: (error as Error).message };
  }

  // Also test the caseinfo endpoint to make sure API key works
  try {
    const caseInfoResponse = await axios.get(
      "https://freetaxhistory.logiqs.com/publicapi/2020-02-22/cases/caseinfo",
      { params: { apikey: API_KEY, CaseID: 10001 } }
    );
    results.caseInfoTest = {
      status: caseInfoResponse.status,
      hasData: !!caseInfoResponse.data,
      sample: caseInfoResponse.data,
    };
  } catch (error) {
    results.caseInfoTest = { error: (error as Error).message };
  }

  return NextResponse.json({
    apiKey: API_KEY ? `${API_KEY.substring(0, 8)}...` : "NOT SET",
    testStatusId,
    results,
  });
}
