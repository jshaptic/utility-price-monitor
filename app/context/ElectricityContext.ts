import { createContext, useContext } from "react";
import { ElectricityContextType } from "~/types";

export const ElectricityContext = createContext<ElectricityContextType | null>(null);

export const useElectricityContext = () => {
  const context = useContext(ElectricityContext);
  if (!context) {
    throw new Error("useElectricityContext must be used within a ElectricityContext");
  }
  return context;
};