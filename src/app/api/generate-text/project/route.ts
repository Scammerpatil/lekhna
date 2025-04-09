import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  const { title, technologies, description } = await req.json();
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  try {
    const prompt = `
    You're an AI assistant helping users write compelling descriptions for their software development projects.

    Given the following information:

    - **Project Title**: ${title}
    - **Technologies Used**: ${technologies?.join(", ") || "Not provided"}
    ${
      description ? `- **Existing Description (optional)**: ${description}` : ""
    }

    Write 3-5 bullet point style project descriptions that:
    - Highlight what the project does and its impact
    - Mention the technologies naturally
    - Emphasize results, features, or user experience
    - Are professional, concise, and resume-friendly

    Each description should be a single bullet point, suitable for use in a resume under a "Projects" section.
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
    return NextResponse.json({ descriptions: achievements }, { status: 200 });
  } catch (error) {
    console.error("Error generating suggestions:", error);
    return NextResponse.json(
      { error: "Error generating suggestions" },
      { status: 500 }
    );
  }
}
