import OpenAI from "openai";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { google, createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

// const genAi = createGoogleGenerativeAI({
//   baseURL: "https://generativelanguage.googleapis.com/v1beta",
//   apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
// });
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export async function POST(req: Request) {
  const prompt =
    "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

  try {
    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await model.generateContent(prompt);
  
    return NextResponse.json(
      {
        success: true,
        message: response.response,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: true,
        message: error,
      },
      { status: 500 }
    )
  }
  
}
