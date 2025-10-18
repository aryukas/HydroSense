import { useState } from "react";
import PredictionForm from "../components/PredictionCard";
import PredictionResult from "../components/PredictionResult";
import PredictionHistory from "../components/PredictionHistory";
import Chart from "../components/Charts";
import { predictRainfall } from "../utils/api";

export default function Home() {
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const handlePredict = async (payload) => {
    const data = await predictRainfall(payload);
    setResult(data);
    setHistory((prev) => [{ ...data, timestamp: new Date().toLocaleString() }, ...prev]);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">HydroSense Rainfall Prediction</h1>
      <PredictionForm onPredict={handlePredict} />
      <PredictionResult result={result} />
      <Chart data={result} />
      <PredictionHistory history={history} />
    </div>
  );
}
