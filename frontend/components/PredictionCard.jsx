import React from "react";

const PredictionCard = ({ value }) => {
  if (!value) return null;

  return (
    <div className="p-6 bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl shadow-md text-center mt-4">
      <h2 className="text-2xl font-semibold">Predicted Rainfall</h2>
      <p className="text-4xl font-bold text-blue-700 mt-2">{value.toFixed(2)} mm</p>
    </div>
  );
};

export default PredictionCard;
