// Note: The following code is written in JavaScript (not Python) and is meant to be run in a browser context.

// Import the necessary modules using ES6 import syntax
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// Define constants
const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyDq9NO6fA2auivMRw8GRLvdiEPtWfV8nYo"; // Replace with your actual API key

// Define an async function to run the chat
export async function runChat(message) {
  try {
    // Create an instance of GoogleGenerativeAI
    const genAI = new GoogleGenerativeAI(API_KEY);

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    // Configure generation settings
    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    // Define safety settings
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      // Add other safety settings as needed
    ];

    // Start a chat session
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: "user",
          parts: [{ text: "hi" }],
        },
        {
          role: "model",
          parts: [{ text: "Hello there! How can I assist you today?" }],
        },
        // Add more chat history as needed
      ],
    });

    // Send a message and get the response
    const result = await chat.sendMessage(message);
    const response = result.response;

    // Return the response text
    return response.text();
  } catch (error) {
    console.error("Error in runChat:", error);
    return "An error occurred while processing the chat.";
  }
}


  