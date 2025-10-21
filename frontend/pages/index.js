"use client";

import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Background3D from "../components/Background3D";
import InputForm from "../components/InputForm";
import PredictionResult from "../components/PredictionResult";
import Charts from "../components/Charts";

// Dynamically import IndiaMap with no SSR
const IndiaMap = dynamic(() => import("../components/IndiaMap"), { ssr: false });

export default function Home() {
  const [selected, setSelected] = useState(null);
  const [districtStats, setDistrictStats] = useState(null);
  const [predictionData, setPredictionData] = useState(null);

  useEffect(() => {
    if (!selected) return;
    async function fetchStats() {
      const res = await fetch(`/api/district-stats?id=${selected}`);
      const data = await res.json();
      setDistrictStats(data);
    }
    fetchStats();
  }, [selected]);

  const handlePredict = (formData) => {
    setPredictionData(formData);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-sky-900 via-sky-800 to-emerald-900 text-white overflow-hidden">
      <Background3D />

      <div className="max-w-[1200px] mx-auto p-6 space-y-6">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold">HydroSense — India Heatmap</h1>
            <p className="text-sm text-sky-200/70">
              Zoom to districts. Click a district for NDVI & rainfall stats.
            </p>
          </div>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 h-[70vh] border border-white/10 shadow-lg rounded-xl overflow-hidden">
            <IndiaMap onSelectDistrict={(id) => setSelected(id)} />
          </div>
          <div className="md:col-span-1 flex flex-col gap-6">
            <Sidebar data={districtStats} />
            <InputForm onPredict={handlePredict} />
            <PredictionResult data={predictionData} />
            <Charts data={predictionData} />
          </div>
        </div>
      </div>
    </div>
  );
}
