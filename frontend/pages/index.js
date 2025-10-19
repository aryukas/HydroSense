import React from "react";
import { motion } from "framer-motion";
import { CloudSun, Droplets, Wind, Thermometer } from "lucide-react";
import InputForm from "../components/InputForm";
import PredictionResult from "../components/PredictionResult";
import ThreeBackground from "../components/ThreeBackground";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-dark text-white overflow-hidden flex flex-col items-center justify-center px-6">
      <ThreeBackground />

      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-bold mb-6 text-center"
      >
        🌦️ HydroSense
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-lg mb-10 text-center max-w-2xl"
      >
        Predict rainfall patterns, analyze weather data, and visualize environmental changes
        with AI-powered insights.
      </motion.p>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-secondary/70 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-xl"
      >
        <InputForm />
        <PredictionResult />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex gap-8 mt-12 text-accent"
      >
        <CloudSun size={36} />
        <Droplets size={36} />
        <Wind size={36} />
        <Thermometer size={36} />
      </motion.div>
    </div>
  );
}
