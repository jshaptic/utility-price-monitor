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
      discount?: number;
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

export type ElectricityProviderData = {
  id: string;
  name: string;
  products: {
    name: string;
    priceSource: 'stock' | 'provider';
    onekWhPrice: {
      value: number;
      fixed: boolean;
    };
    contracts: [
      {
        description: string;
        period?: number;
        fixedMonthlyFee: {
          value: number;
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
      },
    ];
  }[];
};

export const commonData: ElectricityCommonData = electricityCommonData;
export const providerData: ElectricityProviderData[] = fullProviderData.map(
  ({ electricity, ...provider }) =>
    ({
      ...provider,
      products: electricity.products,
    } as ElectricityProviderData),
);
