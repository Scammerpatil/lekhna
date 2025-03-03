import sys
import json
import pdfminer.high_level
import requests

OLLAMA_API_URL = "http://localhost:11434/api/generate"

def query_ollama(prompt):
    """Send a request to the local Ollama LLaMA model."""
    response = requests.post(OLLAMA_API_URL, json={"model": "llama3", "prompt": prompt})
    return response.json().get("response", "No response from LLaMA.")

def analyze_resume(resume_path, job_description):
    """Extract text from resume and analyze it using LLaMA."""
    resume_text = pdfminer.high_level.extract_text(resume_path)

    # Prompt 1: Percentage Match & Missing Keywords
    input_prompt1 = f"""
    You are a skilled ATS (Application Tracking System) scanner with expertise in Data Science, Full Stack Development, Web Development, DevOps, Big Data Engineering, and Data Analysis.
    Your task is to evaluate the resume against the job description. Provide:
    - Percentage Match (only the number, no extra words).
    - Missing Keywords (list format).

    Job Description: {job_description}
    Resume Text: {resume_text[:1000]}...  # Limiting to 1000 chars for processing
    """

    ats_response = query_ollama(input_prompt1)

    # Extract percentage and missing keywords
    percentage_match = 0
    missing_keywords = []
    for line in ats_response.split("\n"):
        if "Percentage Match:" in line:
            percentage_match = float(line.split(":")[-1].strip().replace("%", ""))
        elif "Missing Keywords:" in line:
            missing_keywords = line.split(":")[-1].strip().strip("[]").split(",")

    # Prompt 2: Resume Strengths & Improvement Suggestions
    input_prompt2 = f"""
    You are an experienced HR with deep expertise in technical hiring for Data Science, Full Stack Development, Web Development, DevOps, Big Data Engineering, and Data Analyst roles.
    Your task is to evaluate this resume against the job description. Provide:
    - Resume Strengths (list format).
    - Improvement Suggestions (list format).

    Job Description: {job_description}
    Resume Text: {resume_text[:1000]}...
    """

    hr_response = query_ollama(input_prompt2)

    resume_strengths = []
    improvement_suggestions = []
    for line in hr_response.split("\n"):
        if "Strengths:" in line:
            resume_strengths = line.split(":")[-1].strip().strip("[]").split(",")
        elif "Suggestions:" in line:
            improvement_suggestions = line.split(":")[-1].strip().strip("[]").split(",")

    # Structure response for React
    response = {
        "matchPercentage": round(percentage_match, 2),
        "missingKeywords": [kw.strip() for kw in missing_keywords if kw.strip()],
        "resumeStrengths": [st.strip() for st in resume_strengths if st.strip()],
        "improvementSuggestions": [imp.strip() for imp in improvement_suggestions if imp.strip()],
    }

    print(json.dumps(response))

if __name__ == "__main__":
    resume_path = sys.argv[1]
    job_description = sys.argv[2]
    analyze_resume(resume_path, job_description)
