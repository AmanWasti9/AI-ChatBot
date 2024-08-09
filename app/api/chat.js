import { searchDocuments } from "../lib/retriever"; // Adjust path if necessary
import { generateResponse } from "../lib/gemini"; // Adjust path if necessary

export async function POST(request) {
  try {
    const { query } = await request.json();
    const documents = await searchDocuments(query);
    const response = await generateResponse(query, documents);
    return new Response(JSON.stringify({ response }), { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      { status: 500 }
    );
  }
}
