import React, { useState } from "react";
import { getPrediction } from "../utils/api";

const InputForm = ({ onPrediction }) => {
  const [form, setForm] = useState({ ndvi: "", temperature: "", humidity: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await getPrediction(form);
    setLoading(false);
    onPrediction(result.prediction);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-2xl shadow">
      <input name="ndvi" placeholder="NDVI" onChange={handleChange} className="input" />
      <input name="temperature" placeholder="Temperature (°C)" onChange={handleChange} className="input" />
      <input name="humidity" placeholder="Humidity (%)" onChange={handleChange} className="input" />
      <button type="submit" className="btn-primary">
        {loading ? "Predicting..." : "Predict"}
      </button>
    </form>
  );
};

export default InputForm;
