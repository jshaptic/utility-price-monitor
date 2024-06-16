import ElectricityProviderTable from "~/components/ElectricityProviderTable";
import ElectricityCurrentConnection from "~/components/ElectricityCurrentConnection";
import ElectricityCurrentPlan from "~/components/ElectricityCurrentPlan";
import ElectricityUsage from "~/components/ElectricityUsage";
import ElectricityHistoryChart from "~/components/ElectricityHistoryChart";
import { ScrollArea } from "~/components/ui/scroll-area";

export default function ElectricityPage() {
  return (
    <ScrollArea className="h-[calc(100vh-86px)] pr-2 mt-4">
      <div className="flex flex-col gap-4 p-4">
        <div className="grid grid-cols-3 gap-2">
          <ElectricityCurrentConnection />
          <ElectricityCurrentPlan />
          <ElectricityUsage />
        </div>
        <ElectricityProviderTable />
        <ElectricityHistoryChart />
      </div>
    </ScrollArea>
  );
}
