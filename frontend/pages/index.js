"use client";

import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";

// Components
import Sidebar from "../components/Sidebar";
import Background3D from "../components/Background3D";
import InputForm from "../components/InputForm";
import PredictionResult from "../components/PredictionResult";
import Charts from "../components/Charts";

// Dynamically import IndiaMap to prevent SSR issues
const IndiaMap = dynamic(() => import("../components/IndiaMap"), { ssr: false });

export default function Home() {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [districtStats, setDistrictStats] = useState(null);
  const [predictionData, setPredictionData] = useState(null);

  // Fetch stats whenever a district is selected
  useEffect(() => {
    if (!selectedDistrict) return;

    const fetchStats = async () => {
      try {
        const res = await fetch(`/api/district-stats?id=${selectedDistrict}`);
        if (!res.ok) throw new Error("Failed to fetch district stats");
        const data = await res.json();
        setDistrictStats(data);
      } catch (error) {
        console.error("Error fetching district stats:", error);
        setDistrictStats(null);
      }
    };

    fetchStats();
  }, [selectedDistrict]);

  // Handle predictions from InputForm
  const handlePredict = (formData) => {
    setPredictionData(formData);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-sky-900 via-sky-800 to-emerald-900 text-white overflow-hidden flex flex-col">
      {/* Background 3D effects */}
      <Background3D />

      {/* Header */}
      <header className="max-w-[1200px] mx-auto p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 z-10 relative">
        <div>
          <h1 className="text-4xl font-bold">HydroSense — India Heatmap</h1>
          <p className="text-sm text-sky-200/70 mt-1">
            Zoom to districts. Click a district for NDVI & rainfall stats.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1200px] mx-auto p-6 flex-1 grid md:grid-cols-3 gap-6 z-10 relative">
        {/* Map Section */}
        <div className="md:col-span-2 h-[70vh] w-full border border-white/10 shadow-lg rounded-xl overflow-hidden">
          <IndiaMap onSelectDistrict={setSelectedDistrict} />
        </div>

        {/* Right Sidebar / Controls */}
        <div className="md:col-span-1 flex flex-col gap-6">
          <Sidebar data={districtStats} />
          <InputForm onPredict={handlePredict} />
          <PredictionResult data={predictionData} />
          <Charts data={predictionData} />
        </div>
      </main>
    </div>
  );
}
