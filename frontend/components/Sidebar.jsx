import React from "react";

const Sidebar = ({ data }) => {
  if (!data) {
    return (
      <div className="bg-white/10 p-4 rounded-lg text-center text-sky-100">
        Click a district to view stats
      </div>
    );
  }

  return (
    <div className="bg-white/10 p-4 rounded-lg space-y-2">
      <h2 className="text-lg font-bold text-sky-200">District Data</h2>
      <p>NDVI: {data.ndvi}</p>
      <p>Rainfall: {data.rainfall} mm</p>
      <p>Dryness Index: {data.dryness}</p>
    </div>
  );
};

export default Sidebar;
