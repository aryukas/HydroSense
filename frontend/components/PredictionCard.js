export default function PredictionCard({ predictions }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      {predictions &&
        Object.entries(predictions).map(([model, value]) => (
          <div
            key={model}
            className="p-4 border rounded shadow bg-gray-50 hover:bg-gray-100"
          >
            <h3 className="font-bold">{model}</h3>
            <p className="text-xl mt-2">{value}</p>
          </div>
        ))}
    </div>
  );
}
