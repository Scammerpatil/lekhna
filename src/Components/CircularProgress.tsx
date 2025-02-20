"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CircularProgress = ({ percentage }: { percentage: number }) => {
  const data = {
    datasets: [
      {
        data: [percentage, 100 - percentage], // Filled & Remaining
        backgroundColor: ["#2563eb", "#e5e7eb"], // Primary color & Light gray
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "70%", // Creates a thinner ring
    plugins: { tooltip: { enabled: false } },
  };

  return (
    <div className="w-28 h-28 relative flex items-center justify-center">
      <Doughnut data={data} options={options} />
      <span className="absolute text-lg font-bold text-primary">{percentage}%</span>
    </div>
  );
};

export default CircularProgress;
