import { FC } from 'react';
import { TableCell } from '~/components/ui/table';
import { includeVatAtom } from './ElectricityComparisonTable';
import { useAtom } from 'jotai';
import { usePriceRenderer } from '~/hooks/usePriceRenderer';

type Props = {
  connectionPrice: number;
  monthlyUsagePrice: number | { min: number; max: number };
  monthlyFee: number;
};

export const MonthlyBill: FC<Props> = ({ connectionPrice, monthlyUsagePrice, monthlyFee }) => {
  const [includeVat] = useAtom(includeVatAtom);
  const { renderPrice } = usePriceRenderer({ includeVat });

  return (
    <TableCell className='text-base text-center font-semibold border bg-slate-700 border-slate-700 text-white'>
      {typeof monthlyUsagePrice === 'object'
        ? `${renderPrice(monthlyUsagePrice.min + connectionPrice + monthlyFee)} - ${renderPrice(
            monthlyUsagePrice.max + connectionPrice + monthlyFee,
          )}`
        : renderPrice(monthlyUsagePrice + connectionPrice + monthlyFee)}
    </TableCell>
  );
};
