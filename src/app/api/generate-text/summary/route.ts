import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  const { user } = await req.json();
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  if (!user) {
    return NextResponse.json(
      { error: "User information is required" },
      { status: 400 }
    );
  }
  try {
    const prompt = `
        Write a professional 3-5 line resume summary for the following person:
        ${JSON.stringify(user, null, 2)}
        The summary should be concise and highlight the person's skills, experience, and achievements.
        Extract required information from the user object and format it into a summary.
        Make the tone confident and concise.
        `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const lines = text.split("\n").filter((line) => line.trim().length > 0);
    const summary = lines.map((line) =>
      line.replace(/^[0-9]+\.\s*/, "").trim()
    );
    return NextResponse.json({ summary: summary }, { status: 200 });
  } catch (error) {
    console.error("Summary generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate summary" },
      { status: 500 }
    );
  }
}
