import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export default function Charts({ data }) {
  if (!data) return null;

  const chartData = {
    labels: ["NDVI", "Temperature (°C)", "Humidity (%)", "Rainfall (mm)"],
    datasets: [
      {
        label: "Environmental Inputs",
        data: [data.NDVI, data.temperature, data.humidity, data.rainfall],
        backgroundColor: [
          "rgba(52, 211, 153, 0.7)", // NDVI - green
          "rgba(59, 130, 246, 0.7)", // Temp - blue
          "rgba(251, 191, 36, 0.7)", // Humidity - yellow
          "rgba(239, 68, 68, 0.7)",  // Rainfall - red
        ],
        borderColor: [
          "rgba(52, 211, 153, 1)",
          "rgba(59, 130, 246, 1)",
          "rgba(251, 191, 36, 1)",
          "rgba(239, 68, 68, 1)",
        ],
        borderWidth: 2,
        borderRadius: 6,
        maxBarThickness: 50,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // remove legend to reduce clutter
      },
      title: {
        display: true,
        text: "🌿 Environmental Data Overview",
        color: "white",
        font: { size: 20, weight: "bold" },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw}`;
          },
        },
      },
      datalabels: {
        color: "white",
        anchor: "end",
        align: "end",
        font: { weight: "bold", size: 14 },
      },
    },
    scales: {
      x: {
        ticks: { color: "white", font: { size: 14, weight: "bold" } },
        grid: { display: false },
      },
      y: {
        ticks: { color: "white", font: { size: 14 } },
        grid: { color: "rgba(255,255,255,0.1)" },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="mt-6 bg-gradient-to-br from-blue-800/40 via-teal-800/30 to-indigo-900/40 p-6 rounded-2xl shadow-xl border border-white/20">
      <Bar data={chartData} options={options} plugins={[ChartDataLabels]} />
    </div>
  );
}
