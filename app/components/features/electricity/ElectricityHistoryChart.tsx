import { Line, LineChart } from "recharts";

const data = [
  { name: "Page A", uv: 100, pv: 2400, amt: 2400 },
  { name: "Page A", uv: 400, pv: 200, amt: 200 },
  { name: "Page A", uv: 300, pv: 300, amt: 200 },
];

export default function ElectricityHistoryChart() {
  return (
    <div>
      <h2 className="text-lg mb-4 font-bold">Compare History</h2>
      <div className="border rounded-lg">
        <LineChart width={400} height={200} data={data}>
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        </LineChart>
      </div>
    </div>
  );
}
