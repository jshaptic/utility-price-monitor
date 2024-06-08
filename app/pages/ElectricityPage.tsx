import { LineChart, Line } from "recharts";
import ElectricityTable from "~/components/ElectricityTable";
import { Card } from "~/components/ui/card";
import ElectricityCurrentConnection from "~/components/ElectricityCurrentConnection";
import ElectricityCurrentPlan from "~/components/ElectricityCurrentPlan";
import ElectricityUsage from "~/components/ElectricityUsage";

const data = [{ name: "Page A", uv: 400, pv: 2400, amt: 2400 }, { name: "Page A", uv: 400, pv: 2400, amt: 2400 }];

export default function ElectricityPage() {
  return (
    <div className="flex flex-col mt-4 gap-4">
      <Card className="p-4">
        <div className="grid grid-cols-3 gap-2">
          <ElectricityCurrentConnection />
          <ElectricityCurrentPlan />
          <ElectricityUsage />
        </div>
        <ElectricityTable />
        <LineChart width={400} height={400} data={data}>
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        </LineChart>
      </Card>
    </div>
  );
}
