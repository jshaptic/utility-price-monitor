import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export default function ElectricityUsage() {
  const [usage, setUsage] = useState<number>();
  const [unit, setUnit] = useState("month");
  return (
    <form className="text-sm">
      <fieldset className="flex flex-col gap-4 rounded-lg border p-4 h-full">
        <legend className="-ml-1 px-1 font-medium">Electricity Usage</legend>
        <div>
          Specify your electricity usage to calculate the cost of the
          electricity and compare provider offers.
        </div>
        <div className="grid grid-cols-6 items-center gap-2">
          <Label htmlFor="usage" className="col-span-1">
            Usage
          </Label>
          <Input
            id="usage"
            type="number"
            value={usage}
            onChange={(e) => setUsage(+e.target.value)}
            className="col-span-2"
          />
          <Select value={unit} onValueChange={setUnit}>
            <SelectTrigger className="col-span-3">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">kWh/month</SelectItem>
              <SelectItem value="day">kWh/day</SelectItem>
              <SelectItem value="hour">kWh/hour</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </fieldset>
    </form>
  );
}
