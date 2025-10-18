export default function History({ history }) {
  return (
    <div className="mt-6">
      <h2 className="font-bold text-lg mb-2">Past Predictions</h2>
      <ul className="list-disc pl-5">
        {history.map((item, idx) => (
          <li key={idx}>
            {item.timestamp} - {item.model}: {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
}
