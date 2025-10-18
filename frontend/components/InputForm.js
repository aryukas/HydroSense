import { useState } from "react";

export default function InputForm({ onPredict }) {
  const [meanNorm, setMeanNorm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onPredict({ Mean_Normalized: parseFloat(meanNorm) });
    setMeanNorm("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-96">
      <input
        type="number"
        step="0.01"
        placeholder="Mean Normalized"
        value={meanNorm}
        onChange={(e) => setMeanNorm(e.target.value)}
        className="p-2 border rounded"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Predict
      </button>
    </form>
  );
}
