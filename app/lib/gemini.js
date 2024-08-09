// lib/gemini.js
import axios from "axios";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent"; // Use the correct API endpoint
const API_KEY = "AIzaSyDYmligr0eUjKVNQqXJRKfFacWbWSiaPN0"; // Replace with your actual API key

export const generateResponse = async (query, documents) => {
  try {
    // Construct the request payload as per API requirements
    const payload = {
      contents: [
        {
          parts: [
            {
              text: query,
            },
          ],
        },
      ],
    };

    // Make the request to the Gemini API
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${API_KEY}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Return the response text from the API
    return response.data; // Adjust this based on the structure of the API response
  } catch (error) {
    console.error("Error generating response:", error);
    throw new Error("Failed to generate response");
  }
};
