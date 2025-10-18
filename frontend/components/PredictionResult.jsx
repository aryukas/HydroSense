export default function PredictionResult({ result }) {
  if (!result) return null;

  return (
    <div className="mt-4 p-4 border rounded shadow-md">
      <h2 className="font-bold text-lg mb-2">Prediction Result</h2>
      <p>Predicted Rainfall: {result.rainfall} mm</p>
      <p>Top Factors: {result.top_features.join(", ")}</p>
    </div>
  );
}
