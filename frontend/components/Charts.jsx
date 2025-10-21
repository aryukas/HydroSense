import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Charts({ timeseries }) {
  if (!timeseries || timeseries.length === 0) return <div className="text-sm text-sky-200/70">No timeseries data</div>;

  const labels = timeseries.map((t) => t.date);
  const ndviData = timeseries.map((t) => Number(t.NDVI));
  const rainData = timeseries.map((t) => Number(t.rainfall));

  const data = {
    labels,
    datasets: [
      {
        label: "NDVI",
        data: ndviData,
        yAxisID: "y1",
        tension: 0.2,
      },
      {
        label: "Rainfall (mm)",
        data: rainData,
        yAxisID: "y2",
        type: "bar",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { position: "top", labels: { color: "#fff" } } },
    scales: {
      y1: {
        type: "linear",
        position: "left",
        min: 0,
        max: 1,
        ticks: { color: "#fff" },
      },
      y2: {
        type: "linear",
        position: "right",
        ticks: { color: "#fff" },
      },
      x: { ticks: { color: "#fff" } },
    },
  };

  return (
    <div style={{ background: "transparent" }}>
      <Line data={data} options={options} />
    </div>
  );
}
