import React, { useState } from "react";
import InputForm from "../components/InputForm";
import PredictionCard from "../components/PredictionCard";

export default function Home() {
  const [prediction, setPrediction] = useState(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-sky-50 p-8">
      <h1 className="text-3xl font-bold mb-4 text-blue-800">🌧️ HydroSense</h1>
      <InputForm onPrediction={setPrediction} />
      <PredictionCard value={prediction} />
    </div>
  );
}
