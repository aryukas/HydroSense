"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCloudSun, FaLeaf, FaTint, FaWind } from "react-icons/fa";

const InputForm = ({ onSubmit }) => {
  // ✅ Safe initial state (fixes NDVI error)
  const [formData, setFormData] = useState({
    NDVI: "",
    temperature: "",
    humidity: "",
    windSpeed: "",
    rainfall: "",
    vegetation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-lg mx-auto p-6 rounded-2xl shadow-2xl 
                 backdrop-blur-lg bg-white/10 border border-white/20"
      style={{
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.1), rgba(0,150,255,0.1))",
      }}
    >
      <h2 className="text-2xl font-semibold text-center text-cyan-100 mb-6">
        🌦️ Weather & Vegetation Inputs
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* NDVI */}
        <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3">
          <FaLeaf className="text-green-400 text-xl" />
          <input
            type="number"
            name="NDVI"
            step="0.01"
            placeholder="NDVI Index"
            value={formData?.NDVI || ""}
            onChange={handleChange}
            className="w-full bg-transparent outline-none text-white placeholder-gray-300"
          />
        </div>

        {/* Temperature */}
        <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3">
          <FaCloudSun className="text-yellow-300 text-xl" />
          <input
            type="number"
            name="temperature"
            placeholder="Temperature (°C)"
            value={formData?.temperature || ""}
            onChange={handleChange}
            className="w-full bg-transparent outline-none text-white placeholder-gray-300"
          />
        </div>

        {/* Humidity */}
        <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3">
          <FaTint className="text-blue-400 text-xl" />
          <input
            type="number"
            name="humidity"
            placeholder="Humidity (%)"
            value={formData?.humidity || ""}
            onChange={handleChange}
            className="w-full bg-transparent outline-none text-white placeholder-gray-300"
          />
        </div>

        {/* Wind Speed */}
        <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3">
          <FaWind className="text-sky-400 text-xl" />
          <input
            type="number"
            name="windSpeed"
            placeholder="Wind Speed (km/h)"
            value={formData?.windSpeed || ""}
            onChange={handleChange}
            className="w-full bg-transparent outline-none text-white placeholder-gray-300"
          />
        </div>

        {/* Rainfall */}
        <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3">
          <img src="/icons/rain.svg" alt="rain" className="w-5 h-5" />
          <input
            type="number"
            name="rainfall"
            placeholder="Rainfall (mm)"
            value={formData?.rainfall || ""}
            onChange={handleChange}
            className="w-full bg-transparent outline-none text-white placeholder-gray-300"
          />
        </div>

        {/* Vegetation */}
        <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3">
          <img src="/icons/leaf.svg" alt="leaf" className="w-5 h-5" />
          <input
            type="text"
            name="vegetation"
            placeholder="Vegetation Type"
            value={formData?.vegetation || ""}
            onChange={handleChange}
            className="w-full bg-transparent outline-none text-white placeholder-gray-300"
          />
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 
                     text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-cyan-500/30"
        >
          🔍 Predict Precipitation
        </motion.button>
      </form>
    </motion.div>
  );
};

export default InputForm;
