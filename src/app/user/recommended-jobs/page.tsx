"use client";
import { useUser } from "@/context/UserContext";
import { IconClipboardText, IconCloudUpload } from "@tabler/icons-react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface Job {
  title: string;
  company: string;
  location: string;
  logo: string;
  link: string;
  posted: string;
  activelyHiring: boolean;
  easyApply: boolean;
}

const RecommendedJobs = () => {
  const { user } = useUser();
  const [jobs, setJobs] = useState([]);
  const [file, setFile] = useState<File | null>(null);
  if (!user) return null;

  const fetchJobs = async () => {
    if (!file) {
      toast.error("Please upload a file first.");
      return;
    }
    try {
      const response = axios.postForm("/api/user/recommended-jobs", { file });
      toast.promise(response, {
        loading: "Fetching jobs...",
        success: (data) => {
          console.log(data.data);
          setJobs(data.data.jobs);
          return "Jobs fetched successfully!";
        },
        error: "Failed to fetch jobs.",
      });
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Failed to fetch jobs. Please try again.");
    }
  };

  return (
    <>
      <h1 className="text-4xl text-center uppercase font-bold mb-4">
        Recommended Jobs
      </h1>

      <div className="flex mt-6 items-center justify-center w-full max-w-md mx-auto hover:bg-base-100">
        <label
          className="flex flex-col items-center justify-center w-full h-full border-2 border-base-content border-dashed rounded-lg cursor-pointer bg-base-100 py-2"
          htmlFor="dropzone-file"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <IconCloudUpload size={48} className="text-base-content" />
            <p className="mb-2 text-sm text-base-content">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-base-content">PDF (MAX. 800x400px)</p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            accept=".pdf"
            onChange={(e) => {
              setFile(e.target.files?.[0] || null);
            }}
          />
          {file && (
            <button className="btn btn-sm btn-info max-w-sm text-center">
              <IconClipboardText size={14} />
              {file?.name}
            </button>
          )}
        </label>
      </div>

      <button
        className="btn btn-accent btn-outline w-full mt-6 px-36"
        onClick={fetchJobs}
      >
        Fetch Jobs
      </button>
      {jobs && jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {jobs.map((job: Job, index: number) => (
            <div key={index} className="card bg-base-300 shadow-sm ">
              <figure>
                <img src={job.logo} alt="Company Logo" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{job.title}</h2>
                <p className="text-sm text-base-content/80">{job.company}</p>
                <p className="text-sm">{job.location}</p>
                <p className="text-xs text-base-content/60">{job.posted}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {job.activelyHiring && (
                    <span className="badge badge-success">Actively Hiring</span>
                  )}
                  {job.easyApply && (
                    <span className="badge badge-info">Easy Apply</span>
                  )}
                </div>
                <div className="card-actions justify-end mt-4">
                  <a
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    View Job
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-6">
          <p className="text-lg text-base-content/80">No jobs found.</p>
        </div>
      )}
    </>
  );
};

export default RecommendedJobs;
