import { FC } from 'react';
import { TableCell } from '~/components/ui/table';
import { includeVatAtom } from './ElectricityComparisonTable';
import { useAtom } from 'jotai';
import { usePriceRenderer } from '~/hooks/usePriceRenderer';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '~/components/ui/tooltip';
import { InfoIcon } from '~/components/InfoIcon';

type Props = {
  monthlyUsagePrice: number | { min: number; max: number };
  fixed: boolean;
};

export const MonthlyUsagePrice: FC<Props> = ({ monthlyUsagePrice, fixed }) => {
  const [includeVat] = useAtom(includeVatAtom);
  const { renderPrice } = usePriceRenderer({ includeVat });

  const renderedPrice =
    typeof monthlyUsagePrice === 'object'
      ? `${renderPrice(monthlyUsagePrice.min)} - ${renderPrice(monthlyUsagePrice.max)}`
      : renderPrice(monthlyUsagePrice);

  return (
    <TableCell className='text-center'>
      {fixed ? (
        renderedPrice
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className='relative'>
                {renderedPrice} <InfoIcon type='attention' />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Price is not fixed, it can potential vary from month to month</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </TableCell>
  );
};
