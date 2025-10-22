"use client";

const Sidebar = ({ data }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl flex flex-col gap-4 h-full">
      <h2 className="text-lg font-bold text-white">District Stats</h2>
      {data ? (
        <div className="text-sm text-white space-y-2">
          <p>NDVI: {data.ndvi}</p>
          <p>Rainfall: {data.rainfall} mm</p>
        </div>
      ) : (
        <p className="text-sm text-sky-200/70">Click a district to see stats</p>
      )}
      <button className="bg-blue-600 hover:bg-blue-500 rounded px-4 py-2 font-semibold">
        Example Button
      </button>
    </div>
  );
};

export default Sidebar;
