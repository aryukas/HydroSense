import React from "react";

export default function PredictionResult({ data }) {
  if (!data) return null;

  return (
    <div className="mt-6 p-4 bg-white/20 rounded-xl text-gray-100">
      <h3 className="text-xl font-semibold mb-2">Prediction Input:</h3>
      <p>NDVI: {data.NDVI}</p>
      <p>Temperature: {data.temperature}°C</p>
      <p>Humidity: {data.humidity}%</p>
      <p>Rainfall: {data.rainfall}mm</p>
    </div>
  );
}
