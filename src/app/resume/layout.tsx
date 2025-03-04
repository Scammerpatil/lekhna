"use client";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<string>("light");
  useEffect(() => {
    const storedTheme = localStorage.getItem("resume-theme");
    setTheme(storedTheme || "light");
  }, []);
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Resume</title>
        <link
          href="https://cdn.jsdelivr.net/npm/daisyui@4.12.24/dist/full.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body data-theme={theme} className="w-full min-h-[1120px]">
        {children}
      </body>
    </html>
  );
}
