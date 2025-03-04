"use client";
import { useEffect, useState } from "react";

export default function ResumePage() {
  const [resumeContent, setResumeContent] = useState<string | null>(null);
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    const storedResume = localStorage.getItem("resume");
    const storedTheme = localStorage.getItem("resume-theme");

    if (storedResume) {
      setResumeContent(storedResume);
    } else {
      setResumeContent(
        "<h2 class='text-center text-red-500'>Resume data not found!</h2>"
      );
    }

    setTheme(storedTheme || "light");

    setTimeout(() => {
      window.print();
    }, 500);
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: resumeContent || "" }} />;
}
