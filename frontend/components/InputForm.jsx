import React, { useState } from "react";
import { CloudRain, Thermometer, Droplets, Leaf } from "lucide-react";

export default function InputForm({ onPredict }) {
  const [formData, setFormData] = useState({
    NDVI: "",
    temperature: "",
    humidity: "",
    rainfall: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.NDVI || !formData.temperature || !formData.humidity || !formData.rainfall) {
      alert("Please fill all fields.");
      return;
    }
    onPredict(formData);
  };

  const fields = [
    { name: "NDVI", label: "NDVI Index", icon: Leaf, placeholder: "0.45", color: "green" },
    { name: "temperature", label: "Temperature (°C)", icon: Thermometer, placeholder: "28", color: "red" },
    { name: "humidity", label: "Humidity (%)", icon: Droplets, placeholder: "60", color: "blue" },
    { name: "rainfall", label: "Rainfall (mm)", icon: CloudRain, placeholder: "15", color: "indigo" },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(15px)",
        border: "1px solid rgba(255,255,255,0.3)",
        borderRadius: "25px",
      }}
      className="w-full max-w-lg p-8 shadow-2xl hover:shadow-3xl transition-transform duration-300 hover:-translate-y-1"
    >
      <h2
        style={{
          background: "linear-gradient(to right, #34D399, #3B82F6, #FBBF24)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        className="text-3xl font-bold text-center mb-8"
      >
        🌦️ Environmental Inputs
      </h2>

      <div className="space-y-6">
        {fields.map(({ name, label, icon: Icon, placeholder, color }) => (
          <div key={name}>
            <label className="block text-gray-200 font-semibold mb-2">{label}</label>
            <div
              className={`flex items-center rounded-2xl border-2 border-${color}-400 shadow-md hover:shadow-${color}-500/50 transition duration-300`}
              style={{ backgroundColor: `rgba(255,255,255,0.05)` }}
            >
              <div
                className={`p-3 text-white rounded-l-2xl flex items-center justify-center`}
                style={{ backgroundColor: `${color}50` }}
              >
                <Icon size={24} />
              </div>
              <input
                id={name}
                name={name}
                type="number"
                step="any"
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className="flex-1 p-3 rounded-r-2xl outline-none bg-transparent text-white placeholder-gray-300 hover:bg-white/10 focus:bg-white/20 transition"
              />
            </div>
          </div>
        ))}
      </div>

      <button
        type="submit"
        style={{
          background: "linear-gradient(to right, #10B981, #3B82F6, #F59E0B)",
        }}
        className="w-full mt-8 py-3 text-lg font-bold text-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
      >
        🔍 Predict
      </button>
    </form>
  );
}
