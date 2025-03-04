import { NextRequest, NextResponse } from "next/server";
import ejs from "ejs";
import { readFile } from "fs/promises";
import { join } from "path";
import PDF from "pdfkit";
import fs from "fs";

export async function POST(req: NextRequest) {
  try {
    const { content, theme } = await req.json();

    if (!content || !theme) {
      return NextResponse.json(
        { message: "content and theme are required" },
        { status: 400 }
      );
    }

    const templatePath = join(process.cwd(), "src/app/templates/resume.ejs");
    const template = await readFile(templatePath);

    const html = ejs.render(template, { content, theme });
    console.log("HTML:", html);
    let pdfDoc = new PDF();
    pdfDoc.pipe(fs.createWriteStream("resume.pdf"));
    pdfDoc.text(html, 100, 100);
    pdfDoc.end();

    return NextResponse.redirect(`/api/print?html=${encodeURIComponent(html)}`);
  } catch (error) {
    console.error("Error rendering resume:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
