import React, { useState } from "react";
import { CloudRain, Thermometer, Droplets, Leaf } from "lucide-react";

const InputForm = ({ onPredict }) => {
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
    { name: "NDVI", label: "NDVI Index", icon: Leaf, placeholder: "e.g. 0.45" },
    { name: "temperature", label: "Temperature (°C)", icon: Thermometer, placeholder: "e.g. 28" },
    { name: "humidity", label: "Humidity (%)", icon: Droplets, placeholder: "e.g. 60" },
    { name: "rainfall", label: "Rainfall (mm)", icon: CloudRain, placeholder: "e.g. 15" },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/30 backdrop-blur-lg border border-white/40 rounded-3xl shadow-xl p-8 w-full max-w-lg transition-transform duration-300 hover:shadow-2xl hover:-translate-y-1"
    >
      <h2 className="text-3xl font-bold text-blue-800 text-center mb-8">🌦️ Environmental Inputs</h2>

      <div className="space-y-5">
        {fields.map(({ name, label, icon: Icon, placeholder }) => (
          <div key={name}>
            <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-2">
              {label}
            </label>
            <div className="flex items-center bg-white/80 rounded-2xl border border-gray-300 shadow-sm focus-within:ring-2 focus-within:ring-blue-400 transition">
              <div className="p-3 text-blue-600">
                <Icon size={22} />
              </div>
              <input
                id={name}
                name={name}
                type="number"
                step="any"
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className="flex-1 bg-transparent p-3 rounded-2xl outline-none text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="w-full mt-8 py-3 text-lg font-semibold text-white rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-teal-500 hover:from-teal-500 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-blue-300/50"
      >
        🔍 Predict
      </button>
    </form>
  );
};

export default InputForm;
