import { useLoaderData } from '@remix-run/react';
import { useMemo } from 'react';
import { ElectricityContext } from '~/context/ElectricityContext';
import { ElectricityPage } from '~/pages/ElectricityPage';
import { getMarketPrices } from '~/services/electricity.server';
import type { ElectricityContextType } from '~/types';

export const loader = async () => {
  const prices = await getMarketPrices();
  return { prices };
};

export default function ElectricityRoute() {
  const data = useLoaderData<typeof loader>();

  const context: ElectricityContextType = useMemo(() => ({ marketPrices: data.prices }), [data.prices]);

  return (
    <ElectricityContext.Provider value={context}>
      <ElectricityPage />
    </ElectricityContext.Provider>
  );
}
