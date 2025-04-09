import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  const { rawAchievement } = await req.json();
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  try {
    const prompt = `
      You are an AI assistant helping users improve their resume.

      A user described their achievement in casual or unstructured language:

      "${rawAchievement}"

      Based on this, generate 3–4 concise and professional resume-style bullet points that:
      - Use strong action verbs (e.g., Led, Built, Designed)
      - Highlight impact, skills, and tools if applicable
      - Are suitable for a tech or general resume
      - Do not start with pronouns (I, We)

      Format each as a separate bullet point.
      `;
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const suggestions = text
      .split("\n")
      .filter((line) => line.trim().length > 0)
      .map((line) => line.replace(/^[-*•]\s*/, "").trim());
    const achievements = suggestions.map((suggestion) => {
      return suggestion.replace(/^[0-9]+\.\s*/, "").trim();
    });
    return NextResponse.json({ achievements }, { status: 200 });
  } catch (error) {
    console.error("Error generating suggestions:", error);
    return NextResponse.json(
      { error: "Error generating suggestions" },
      { status: 500 }
    );
  }
}
