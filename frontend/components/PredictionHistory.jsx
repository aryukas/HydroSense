export default function PredictionHistory({ history }) {
  if (!history || history.length === 0) return null;

  return (
    <div className="mt-4">
      <h2 className="font-bold mb-2">Prediction History</h2>
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            <th className="border p-2">Timestamp</th>
            <th className="border p-2">Duration</th>
            <th className="border p-2">Predicted Rainfall (mm)</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item, idx) => (
            <tr key={idx}>
              <td className="border p-2">{item.timestamp}</td>
              <td className="border p-2">{item.duration}</td>
              <td className="border p-2">{item.rainfall}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
