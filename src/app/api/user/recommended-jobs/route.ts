import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.json();
  const response = await fetch(
    "https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0",
        referer: "https://www.linkedin.com/jobs-guest/jobs",
      },
      body: JSON.stringify(formData),
    }
  );
  console.log(response);
}
