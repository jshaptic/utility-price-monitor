import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import GasTable from "~/components/GasTable";
import { Card } from "~/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import ElectricityPage from "~/pages/ElectricityPage";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [utilityType, setUtilityType] = useState("account");
  const getUtilityTable = () => {
    switch (utilityType) {
      case "account":
        return <ElectricityPage />;
      case "password":
        return <GasTable />;
    }
    return null;
  };
  return (
    <div className="relative grid grid-cols-8 gap-8 w-full max-w-screen-xl">
      <div className="col-span-6">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">Electricity Providers</h2>
          <Tabs defaultValue="account" onValueChange={setUtilityType}>
            <TabsList>
              <TabsTrigger value="account">Electricity</TabsTrigger>
              <TabsTrigger value="password">Natural Gas</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        {getUtilityTable()}
      </div>
      <Card className="sticky h-2/3  " />
    </div>
  );
}
