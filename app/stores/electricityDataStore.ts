import electricityCommonData from '../../data/electricity-common-data.json';
import fullProviderData from '../../data/providers.json';

export type ElectricityCommonData = {
  fixedPart: {
    vendor: string;
    description: string;
    configurations: {
      id: string;
      plan: string;
      phases: number;
      amperage: number;
      price: number;
      stateSupport?: number;
    }[];
  };
  variablePart: {
    vendor: string;
    description: string;
    configurations: {
      id: string;
      plan: string;
      price: number;
    }[];
  };
};

export type ElectricityProvider = {
  id: string;
  name: string;
  products: ElectricityProduct[];
};

export type ElectricityProduct = {
  name: string;
  priceSource: 'market' | 'provider';
  contracts: ElectricityContract[];
};

export type ElectricityContract = {
  description: string;
  period?: number;
  onekWhPrice: {
    value: number;
    fixed: boolean;
  };
  fixedMonthlyFee: {
    value: number;
    notes?: string;
  };
  tradingServices?: {
    fee: number;
  };
  productChange: {
    fee: number;
    period: number;
  } | null;
  termination: {
    fee: number;
    period: number;
  } | null;
};

export const commonData: ElectricityCommonData = electricityCommonData;
export const providerData: ElectricityProvider[] = fullProviderData.map(
  ({ electricity, ...provider }) =>
    ({
      ...provider,
      products: electricity.products,
    } as ElectricityProvider),
);
