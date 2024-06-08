import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Label } from "~/components/ui/label";
import { useState } from "react";

const connectionTariffs = [
  {
    name: "16a",
    amperage: "16A",
    phases: [
      {
        name: "1",
        phase: "1",
        plans: [
          {
            name: "basic",
            plan: "Basic",
            tariff: 3.92,
          },
          {
            name: "special",
            plan: "Special",
            tariff: 2.71,
          },
        ],
      },
      {
        name: "3",
        phase: "3",
        plans: [
          {
            name: "basic",
            plan: "Basic",
            tariff: 8.71,
          },
          {
            name: "special",
            plan: "Special",
            tariff: 6.39,
          },
        ],
      },
    ],
  },
];

const getAmperages = () => {
  return connectionTariffs;
};

const getPhaseCount = (amperage?: string) => {
  return connectionTariffs.find((a) => a.name === amperage)?.phases;
};

const getPlans = (amperage?: string, phase?: string) => {
  return connectionTariffs
    .find((a) => a.name === amperage)
    ?.phases.find((p) => p.name === phase)?.plans;
};

export default function ElectricityCurrentConnection() {
  const [amperage, setAmperage] = useState<string>();
  const [phaseCount, setPhaseCount] = useState<string>();
  const [plan, setPlan] = useState<string>();

  const handleAmperageChange = (value: string) => {
    setAmperage(value);

    const defaultPhase = getPhaseCount(value)?.[0]?.name;
    if (!defaultPhase) return;
    setPhaseCount(defaultPhase);

    const defaultPlan = getPlans(value, defaultPhase)?.[0]?.name;
    if (!defaultPlan) return;
    setPlan(defaultPlan);
  };

  const handlePhaseCountChange = (value: string) => {
    setPhaseCount(value);
  };

  const handlePlanChange = (value: string) => {
    setPlan(value);
  };

  return (
    <form className="text-sm">
      <fieldset className="flex flex-col gap-4 rounded-lg border p-4 h-full">
        <legend className="-ml-1 px-1 font-medium">
          Current Electricity Connection
        </legend>
        <div>
          Select the amperage, number of phases, and your electricity connection
          plan. This information should be available in your contract with the
          current provider or on their website.
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="grid gap-3">
            <Label htmlFor="amperage">Amperage</Label>
            <Select onValueChange={handleAmperageChange} value={amperage}>
              <SelectTrigger id="amperage">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {getAmperages().map((a, i) => (
                  <SelectItem key={i} value={a.name}>
                    {a.amperage}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="phaseCount">Phase Count</Label>
            <Select onValueChange={handlePhaseCountChange} value={phaseCount}>
              <SelectTrigger id="phaseCount">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {getPhaseCount(amperage)?.map((p, i) => (
                  <SelectItem key={i} value={p.name}>
                    {p.phase}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="plan">Plan</Label>
            <Select onValueChange={handlePlanChange} value={plan}>
              <SelectTrigger id="plan">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {getPlans(amperage, phaseCount)?.map((p, i) => (
                  <SelectItem key={i} value={p.name}>
                    {p.plan}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </fieldset>
    </form>
  );
}
