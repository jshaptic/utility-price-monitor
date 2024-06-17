import electricityCommonData from '../../data/electricity-common-data.json';
import fullProviderData from '../../data/providers.json';

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

export const commonData: ElectricityCommonData = electricityCommonData;
export const providerData: ElectricityProviderData[] = fullProviderData.map(({ electricity, ...provider }) => ({
  ...provider,
  electricity,
}));
