import Header from "@/Components/Header";
import "../globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <title>Lekhana | AI Based Resume Builder</title>
        <meta
          name="description"
          content="Lekhana (Sanskrit for 'Writing' or 'Documentation') is an AI-powered resume builder and analyzer designed to create impactful resumes. It evaluates resume fitness, matches resumes with job descriptions, and calculates ATS scores to enhance job application success.
          Built with Next.js (daisyUI) for UI and Python (NLP) for analysis, Lekhana ensures resumes are optimized for the best hiring outcomes. 🚀"
        />
      </head>
      <body className={`antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
