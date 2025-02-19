import type { ElectricityMarketPrices } from '~/types';
import { mean } from '~/utils';

const callNordPoolApi = async (year: number, area: string, currency: string) => {
  const url = `https://dataportal-api.nordpoolgroup.com/api/AggregatePrices?year=${year}&market=DayAhead&deliveryArea=${area}&currency=${currency}`;
  const resp = await fetch(url);
  if (resp.status === 204) return; // no content yet
  if (resp.status !== 200) throw new Error(`Unable to make request to nordpool - status ${resp.status}`);

  type NordPoolApiResponse = {
    multiAreaDailyAggregates: [
      {
        deliveryStart: string;
        deliveryEnd: string;
        averagePerArea: {
          [key: string]: number;
        };
        maxPerArea: {
          [key: string]: number;
        };
        minPerArea: {
          [key: string]: number;
        };
      },
    ];
  };
  const data = (await resp.json()) as NordPoolApiResponse;
  return data;
};

export const getMarketPrices = async (): Promise<ElectricityMarketPrices | undefined> => {
  const currentYear = new Date().getFullYear();
  const previousYear = currentYear - 1;

  const apiResponseForCurrentYear = await callNordPoolApi(currentYear, 'LV', 'EUR');
  const apiResponseForPreviousYear = await callNordPoolApi(previousYear, 'LV', 'EUR');
  if (!apiResponseForCurrentYear || !apiResponseForPreviousYear) return;

  const pricesForKwhPerMonth = Object.entries({
    ...apiResponseForCurrentYear.multiAreaDailyAggregates.reduce((acc: { [key: string]: number[] }, x) => {
      const month = x.deliveryStart.substring(0, 7);
      acc[month] = [...(acc[month] ?? []), x.averagePerArea['LV'] / 1000]; // convert from MWh to kWh
      return acc;
    }, {}),
    ...apiResponseForPreviousYear.multiAreaDailyAggregates.reduce((acc: { [key: string]: number[] }, x) => {
      const month = x.deliveryStart.substring(0, 7);
      acc[month] = [...(acc[month] ?? []), x.averagePerArea['LV'] / 1000]; // convert from MWh to kWh
      return acc;
    }, {}),
  }).map(([month, prices]) => ({
    month,
    averagePrice: mean(prices),
    minPrice: Math.min(...prices),
    maxPrice: Math.max(...prices),
  }));

  return {
    yearlyMinPricePerKwh: Math.min(...pricesForKwhPerMonth.map((x) => x.averagePrice ?? 0)) ?? 0,
    yearlyMaxPricePerKwh: Math.max(...pricesForKwhPerMonth.map((x) => x.averagePrice ?? 0)) ?? 0,
  };
};
