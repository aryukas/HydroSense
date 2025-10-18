import { useState } from "react";

export default function PredictionCard({ onPredict }) {
  const [duration, setDuration] = useState("1_day");

  const handleSubmit = (e) => {
    e.preventDefault();
    onPredict({ duration });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-md">
      <label className="block mb-2 font-bold">Select Prediction Duration:</label>
      <select
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        className="border rounded p-2 mb-4 w-full"
      >
        <option value="1_day">1 Day</option>
        <option value="1_week">1 Week</option>
        <option value="1_month">1 Month</option>
        <option value="season">Season</option>
        <option value="1_year">1 Year</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Predict
      </button>
    </form>
  );
}
