import { motion } from "framer-motion";
import { CloudLightning, Droplets } from "lucide-react";

export default function PredictionResult({ result }) {
  if (!result) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mt-8 p-6 bg-white/10 border border-white/20 rounded-2xl text-center text-white shadow-xl max-w-md mx-auto"
    >
      <div className="flex justify-center items-center gap-3 text-2xl font-bold mb-2">
        <CloudLightning /> Predicted Rainfall
      </div>
      <p className="text-4xl font-extrabold text-sky-300">
        {result.PredictedRainfall_mm} mm
      </p>
      <div className="flex justify-center items-center mt-3 text-blue-200 text-sm gap-2">
        <Droplets /> Model Used: {result.Model}
      </div>
    </motion.div>
  );
}
