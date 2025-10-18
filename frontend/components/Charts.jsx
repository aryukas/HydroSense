import { Line } from "react-chartjs-2";

export default function Chart({ data }) {
  if (!data) return null;

  const chartData = {
    labels: data.dates,
    datasets: [
      {
        label: "Rainfall (mm)",
        data: data.rainfall,
        fill: false,
        backgroundColor: "blue",
        borderColor: "blue",
      },
    ],
  };

  return <Line data={chartData} />;
}
