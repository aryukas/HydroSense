import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CloudSun, Droplets, Wind, Thermometer } from "lucide-react";
import InputForm from "../components/InputForm";
import PredictionResult from "../components/PredictionResult";
import ThreeBackground from "../components/ThreeBackground";
import Charts from "../components/Charts";

export default function Home() {
  const [predictionData, setPredictionData] = useState(null);
  const [mounted, setMounted] = useState(false); // ✅ Client-only flag

  useEffect(() => {
    setMounted(true); // Component has mounted → safe to render client-only components
  }, []);

  const handlePredict = (formData) => {
    console.log("Prediction received:", formData);
    setPredictionData(formData);
  };

  // Don't render client-only parts until mounted
  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-teal-900 text-white overflow-hidden flex flex-col items-center justify-start px-6 pt-16">
      <ThreeBackground />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4">🌦️ HydroSense</h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
          Predict rainfall patterns, analyze weather data, and visualize environmental changes
          with AI-powered insights.
        </p>
      </motion.div>

      {/* Form + Result + Chart */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8 w-full max-w-4xl flex flex-col md:flex-row gap-8"
      >
        <div className="flex-1">
          <InputForm onPredict={handlePredict} />
        </div>

        <div className="flex-1 flex flex-col gap-6">
          <PredictionResult data={predictionData} />
          <Charts data={predictionData} />
        </div>
      </motion.div>

      {/* Footer Icons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex gap-10 mt-16 text-white/70"
      >
        <CloudSun size={36} className="hover:text-yellow-400 transition" />
        <Droplets size={36} className="hover:text-blue-400 transition" />
        <Wind size={36} className="hover:text-green-300 transition" />
        <Thermometer size={36} className="hover:text-red-400 transition" />
      </motion.div>
    </div>
  );
}
