import { create } from "zustand";
import electricityCommonData from "../../data/electricity-common-data.json";
import providerData from "../../data/providers.json";

export type ElectricityCommonData = {
  monthlyPowerAvailability: {
    vendor: string;
    description: string;
    configurations: {
      id: string;
      plan: string;
      phases: number;
      amperage: number;
      price: number;
    }[];
  };
  onekWhDelivery: {
    vendor: string;
    description: string;
    configurations: {
      id: string;
      plan: string;
      phases: number;
      price: number;
    }[];
  };
};

export type ElectricityProviderData = {
  id: string;
  name: string;
  logo: string;
  electricity: {
    plans: {
      name: string;
      tariff: number;
    }[];
  };
};

interface ElectricityState {
  commonData: ElectricityCommonData;
  providerData: ElectricityProviderData[];
}

export const useElectricityStore = create<ElectricityState>()(() => ({
  commonData: electricityCommonData,
  providerData: providerData.map(({ electricity, ...provider }) => ({
    ...provider,
    electricity,
  })),
}));
