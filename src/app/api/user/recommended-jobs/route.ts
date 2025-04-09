import { NextRequest, NextResponse } from "next/server";
import { PdfReader } from "pdfreader";
import fs from "fs";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const fileData = formData.get("file") as File;
  if (!fileData) {
    return NextResponse.json({ message: "File not found" }, { status: 400 });
  }
  const resumeBuffer = await fileData.arrayBuffer();
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
  const keywordsToSearch = [
    "ReactJS",
    "NodeJS",
    "Full Stack Developer",
    "Java",
    "Spring",
    "Frontend Developer",
    "Web Developer",
    "MERN Stack",
  ];

  const matchedKeywords = keywordsToSearch.filter((kw) =>
    resumeText.toLowerCase().includes(kw.toLowerCase())
  );

  const searchKeywords = matchedKeywords.join(" ") || "Software Developer";

  const params = new URLSearchParams({
    keywords: searchKeywords,
    location: "India",
    f_TPR: "r2592000",
    f_E: "2,3",
    f_WT: "2",
  });
  const url = `https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?${params.toString()}`;
  const { stdout } = await execAsync(
    `py -3.12 python/linkedin_scarper.py "${url}"`
  );
  return NextResponse.json({ jobs: JSON.parse(stdout) }, { status: 200 });
}
