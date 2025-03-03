import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { readPdfText } from "pdf-text-reader";

const OLLAMA_API_URL = "http://localhost:11434/api/generate";

async function queryOllama(prompt: string): Promise<string> {
  const response = await fetch(OLLAMA_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "llama3", prompt }),
  });

  const data = await response.json();
  return data.response || "No response from LLaMA.";
}

const extractTextFromPDF = async (filePath: string) => {
  if (!fs.existsSync(filePath)) {
    return Promise.reject(new Error("File not found"));
  }
  const pdfText: string = await readPdfText({ url: filePath });
  console.info(pdfText);
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const resumeFile = formData.get("resumeFile") as File;
    let jobDescription = formData.get("jobDescription") as string;

    if (!jobDescription || !resumeFile) {
      return NextResponse.json(
        { message: "Please enter a job description and upload a resume." },
        { status: 400 }
      );
    }

    jobDescription = jobDescription.replace(/["\n\r\t]+/g, " ").trim();
    const resumeBuffer = Buffer.from(await resumeFile.arrayBuffer());
    fs.writeFileSync("./resume.pdf", resumeBuffer);
    const resumeText = await extractTextFromPDF("./resume.pdf");
    console.log("Resume Text:", resumeText);

    if (!resumeText) {
      return NextResponse.json(
        { message: "Failed to extract text from resume." },
        { status: 400 }
      );
    }

    const inputPrompt1 = `
      You are a skilled ATS scanner with expertise in tech roles such as Data Science, Full Stack, Web Development, DevOps, Big Data Engineering, and Data Analysis.
      Your task is to evaluate the resume against the provided job description. Provide a percentage match and list missing keywords.

      Job Description: ${jobDescription}
      Resume Text: ${resumeText.substring(0, 500)}...

      Output Format:
      Percentage Match: "%"
      Missing Keywords: []
    `;

    const inputPrompt2 = `
      You are an experienced HR with tech expertise in roles like Data Science, Full Stack, Web Development, DevOps, Big Data Engineering, and Data Analysis.
      Evaluate the resume against the job description, highlight strengths, weaknesses, and provide suggestions.

      Job Description: ${jobDescription}
      Resume Text: ${resumeText.substring(0, 500)}...
    `;

    // Query LLaMA
    const matchResult = await queryOllama(inputPrompt1);
    const improvementSuggestions = await queryOllama(inputPrompt2);

    // Extract percentage match & missing keywords from matchResult
    const percentageMatchMatch = matchResult.match(/Percentage Match: (\d+)%/);
    const missingKeywordsMatch = matchResult.match(
      /Missing Keywords: \[(.*?)\]/
    );

    const matchPercentage = percentageMatchMatch
      ? parseInt(percentageMatchMatch[1], 10)
      : 0;
    const missingKeywords = missingKeywordsMatch
      ? missingKeywordsMatch[1].split(/,\s*/).map((kw) => kw.trim())
      : [];

    // Response structure
    const response = {
      matchPercentage,
      missingKeywords,
      improvementSuggestions: improvementSuggestions.split("\n"),
      resumeStrengths: ["Strong technical background", "Relevant experience"], // Example placeholders
    };
    console.log(response);
    return NextResponse.json({ result: response });
  } catch (error) {
    console.error("Error processing resume:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
