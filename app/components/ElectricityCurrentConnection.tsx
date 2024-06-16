import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Label } from "~/components/ui/label";
import { useMemo, useState } from "react";
import { useElectricityStore } from "~/stores/useElectricityStore";

export default function ElectricityCurrentConnection() {
  const commonElectricityData = useElectricityStore((s) => s.commonData);

  const defaultConfiguration = {
    plan: "Basic",
    phases: "1",
    amperage: "16A",
  };

  const [plan, setPlan] = useState<string>(defaultConfiguration.plan);
  const [phases, setPhases] = useState<string>(defaultConfiguration.phases);
  const [amperage, setAmperage] = useState<string>(
    defaultConfiguration.amperage
  );

  const planList = useMemo(
    () => [
      ...new Set(
        commonElectricityData.monthlyPowerAvailability.configurations.map(
          (c) => c.plan
        )
      ),
    ],
    [commonElectricityData]
  );

  const phaseList = useMemo(
    () => [
      ...new Set(
        commonElectricityData.monthlyPowerAvailability.configurations.map((c) =>
          c.phases.toString()
        )
      ),
    ],
    [commonElectricityData]
  );

  const amperageList = useMemo(() => {
    const list = [
      ...new Set(
        commonElectricityData.monthlyPowerAvailability.configurations
          .filter(
            (c) =>
              (c.plan === plan || !plan) &&
              (c.phases.toString() === phases || !phases)
          )
          .map((c) => c.amperage + "A")
      ),
    ];
    if (!list.includes(amperage)) {
      setAmperage("");
    }
    return list;
  }, [commonElectricityData, amperage, phases, plan]);

  return (
    <form className="text-sm">
      <fieldset className="flex flex-col gap-4 rounded-lg border p-4 h-full">
        <legend className="-ml-1 px-1 font-medium">
          Current Electricity Connection
        </legend>
        <div className="text-muted-foreground">
          Select the amperage, number of phases, and your electricity connection
          plan. This information should be available in your contract with the
          current provider or on their website.
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-7 items-center">
            <Label htmlFor="plan" className="col-span-3">
              Plan
            </Label>
            <Select
              defaultValue={defaultConfiguration.plan}
              onValueChange={setPlan}
              value={plan}
            >
              <SelectTrigger id="plan" className="col-span-4">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {planList?.map((plan, index) => (
                  <SelectItem key={index} value={plan}>
                    {plan}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-7 items-center">
            <Label htmlFor="phases" className="col-span-3">
              Phase Count
            </Label>
            <Select
              defaultValue={defaultConfiguration.phases}
              onValueChange={setPhases}
              value={phases}
            >
              <SelectTrigger id="phases" className="col-span-4">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {phaseList?.map((phases, index) => (
                  <SelectItem key={index} value={phases}>
                    {phases}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-7 items-center">
            <Label htmlFor="amperage" className="col-span-3">
              Amperage
            </Label>
            <Select
              defaultValue={defaultConfiguration.amperage}
              onValueChange={setAmperage}
              value={amperage}
            >
              <SelectTrigger id="amperage" className="col-span-4">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {amperageList?.map((amperage, index) => (
                  <SelectItem key={index} value={amperage}>
                    {amperage}
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
