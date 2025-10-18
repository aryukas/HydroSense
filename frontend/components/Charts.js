import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export default function Charts({ history }) {
  return (
    <div className="mt-6">
      <Plot
        data={history.map((item) => ({
          x: [item.timestamp],
          y: [item.value],
          type: "scatter",
          mode: "lines+markers",
          name: item.model,
        }))}
        layout={{ title: "Prediction History", autosize: true }}
      />
    </div>
  );
}
