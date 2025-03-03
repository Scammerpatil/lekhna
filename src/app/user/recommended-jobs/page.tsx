"use client";
import { useUser } from "@/context/UserContext";
import axios from "axios";
import linkedIn from "linkedin-jobs-api";
import { useEffect, useState } from "react";

const RecommendedJobs = () => {
  const { user } = useUser();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [queryOptions, setQueryOptions] = useState({
    keyword: user?.skills?.[0] || "Software Engineer",
    location: user?.socialLinks?.linkedin ? "Remote" : "India",
    dateSincePosted: "past Week",
    jobType: "full time",
    remoteFilter: "remote",
    salary: "100000",
    experienceLevel: user?.experience.length > 2 ? "mid level" : "entry level",
    limit: "10",
    page: "0",
  });

  if (!user) return null;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setQueryOptions({
          keyword: user.skills?.[0] || "Software Engineer",
          location: user?.socialLinks?.linkedin ? "Remote" : "India",
          dateSincePosted: "past Week",
          jobType: "full time",
          remoteFilter: "remote",
          salary: "100000",
          experienceLevel:
            user.experience.length > 2 ? "mid level" : "entry level",
          limit: "10",
          page: "0",
        });

        const jobResults = await axios.post("/api/user/recommended-jobs", {
          queryOptions,
        });
        setJobs(jobResults.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [user]);

  return (
    <>
      <h1 className="text-4xl text-center uppercase font-bold mb-4">
        Recommended Jobs
      </h1>

      {loading ? (
        <p className="text-center">Fetching jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="text-center text-gray-500">
          No job recommendations found.
        </p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job, index) => (
            <li key={index} className="p-4 border rounded-lg shadow">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-gray-700">{job.company}</p>
              <p className="text-gray-500">{job.location}</p>
              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Job
              </a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default RecommendedJobs;
