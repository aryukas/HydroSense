import React from "react";
import { Leaf, Thermometer, Droplets, CloudRain } from "lucide-react";

export default function PredictionResult({ data }) {
  if (!data) return null;

  const fields = [
    { label: "NDVI", value: data.NDVI, icon: Leaf, color: "green" },
    { label: "Temperature", value: `${data.temperature}°C`, icon: Thermometer, color: "red" },
    { label: "Humidity", value: `${data.humidity}%`, icon: Droplets, color: "blue" },
    { label: "Rainfall", value: `${data.rainfall} mm`, icon: CloudRain, color: "indigo" },
  ];

  return (
    <div
      className="mt-6 p-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300"
      style={{
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(15px)",
        border: "1px solid rgba(255,255,255,0.3)",
      }}
    >
      <h3
        className="text-2xl font-bold mb-4"
        style={{
          background: "linear-gradient(to right, #34D399, #3B82F6, #FBBF24)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        🌟 Prediction Inputs
      </h3>

      <div className="space-y-4">
        {fields.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className={`flex items-center gap-3 p-3 rounded-xl`}
            style={{
              backgroundColor: `${color}30`,
              border: `1px solid ${color}80`,
            }}
          >
            <div
              className="p-2 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: `${color}70` }}
            >
              <Icon size={22} />
            </div>
            <div className="text-white font-semibold text-lg">
              {label}: <span className="font-normal">{value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
