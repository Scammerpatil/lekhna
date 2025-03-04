"use client";
import { IconUpload } from "@tabler/icons-react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";

const JDMatchPage = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!jobDescription || !resumeFile) {
      alert("Please enter a job description and upload a resume.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("resumeFile", resumeFile);
      formData.append("jobDescription", jobDescription);
      const response = axios.post("/api/user/jd-match", formData);
      toast.promise(response, {
        loading: "Analyzing your resume...",
        success: (data) => {
          console.log(data.data);
          setAnalysisResult(data.data.result);
          return "Resume analyzed successfully!";
        },
        error: "An error occurred while analyzing the resume.",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <h1 className="text-4xl text-center uppercase font-bold mb-4">
        Job Description Match
      </h1>

      <textarea
        placeholder="Paste the Job Description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        className="textarea textarea-bordered w-full h-32 mb-4"
      />

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Upload Your Resume</span>
        </label>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="file-input file-input-bordered w-full"
        />
      </div>

      <button onClick={handleSubmit} className="btn btn-primary mt-5 w-full">
        <IconUpload size={20} /> Analyze Resume
      </button>

      {analysisResult && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold">Analysis Result</h2>
          <ReactMarkdown>{analysisResult}</ReactMarkdown>
        </div>
      )}
    </>
  );
};

export default JDMatchPage;
