import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import { PdfReader } from "pdfreader";
import ollama from "ollama";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  try {
    const resumeFile = formData.get("resumeFile") as File;
    let jobDescription = formData.get("jobDescription") as string;
    jobDescription = jobDescription.replace(/["\n\r\t]+/g, " ").trim();
    const resumeBuffer = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(resumeBuffer);
    fs.writeFileSync("resume.pdf", buffer);
    const extractTextFromPDF = (filePath: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        let text = "";
        new PdfReader().parseFileItems(filePath, (err, item) => {
          if (err) {
            reject(err);
          } else if (!item) {
            resolve(text);
          } else if (item.text) {
            text += item.text + " ";
          }
        });
      });
    };
    const resumeText = await extractTextFromPDF("resume.pdf");
    const inputPrompt = `
    You are a skilled ATS scanner with expertise in tech roles such as Data Science, Full Stack, Web Development, DevOps, Big Data Engineering, and Data Analysis.
    Your task is to evaluate the resume against the provided job description. Provide a percentage match and list missing keywords. Also evaluate the resume for strengths and weaknesses and provide suggestions.

    Job Description: ${jobDescription}
    Resume Text: ${resumeText.substring(0, 500)}...

    Output Format:
    Percentage Match: "%"
    Missing Keywords: []
    Strengths: []
    Weaknesses: []
    Suggestions: ""

    Example:
    Percentage Match: 75%
    Missing Keywords: ["Python", "SQL"]
    Strengths: ["Strong technical background", "Relevant experience"]
    Weaknesses: ["Lack of experience with SQL"]
    Suggestions: "Consider adding more projects to showcase your skills in SQL."
  `;
    const response = await ollama.chat({
      model: "llama3",
      messages: [
        {
          role: "user",
          content: inputPrompt,
        },
      ],
    });
    return NextResponse.json({ result: response.message.content });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An error occurred while analyzing the resume." },
      { status: 500 }
    );
  }
}
