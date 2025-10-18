import { useState } from "react";
import InputForm from "../components/InputForm";
import PredictionCard from "../components/PredictionCard";
import History from "../components/History";
import { getPrediction } from "../utils/api";

export default function Home() {
  const [predictions, setPredictions] = useState({});
  const [history, setHistory] = useState([]);

  const handlePredict = async (inputData) => {
    const result = await getPrediction(inputData);
    setPredictions(result);

    const timestamp = new Date().toLocaleString();
    const newHistory = Object.entries(result).map(([model, value]) => ({
      timestamp,
      model,
      value,
    }));
    setHistory([...newHistory, ...history]);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">HydroSense Dashboard</h1>
      <InputForm onPredict={handlePredict} />
      <PredictionCard predictions={predictions} />
      <History history={history} />
    </div>
  );
}
