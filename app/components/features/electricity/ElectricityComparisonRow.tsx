import { FC, useCallback, useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { TableCell, TableRow } from '~/components/ui/table';
import { includeVatAtom } from './ElectricityComparisonTable';
import { monthlyUsageAtom } from './ElectricityUsage';
import {
  fixedPartPriceAtom as connectionFixedPartPriceAtom,
  fixedPartStateSupportAtom as connectionFixedPartStateSupportAtom,
  hasFixedPartStateSupportAtom as connectionHasFixedPartStateSupportAtom,
  variablePartPriceAtom as connectionVariablePartPriceAtom,
} from '~/stores/electricity/atoms';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip';
import { InfoIcon } from '~/components/InfoIcon';
import type { ElectricityContract, ElectricityProduct, ElectricityProvider } from '~/stores/electricityDataStore';
import { MonthlyBill } from './MonthlyBill';
import { useElectricityContext } from '~/context/ElectricityContext';
import { MonthlyUsagePrice } from '~/components/features/electricity/MonthlyUsagePrice';

type Props = {
  provider: Omit<ElectricityProvider, 'products'>;
  product: Omit<ElectricityProduct, 'contracts'>;
  contract: ElectricityContract;
};

export const ElectricityComparisonRow: FC<Props> = ({ provider, product, contract }) => {
  const [includeVat] = useAtom(includeVatAtom);

  // Connection number atoms
  const [connectionFixedPartPriceFromStorage] = useAtom(connectionFixedPartPriceAtom);
  const [connectionFixedPartStateSupportFromStorage] = useAtom(connectionFixedPartStateSupportAtom);
  const [connectionHasFixedPartStateSupportFromStorage] = useAtom(connectionHasFixedPartStateSupportAtom);
  const [connectionVariablePartPriceFromStorage] = useAtom(connectionVariablePartPriceAtom);

  // Connection number states
  const [connectionFixedPartPrice, setConnectionFixedPartPrice] = useState(0);
  const [connectionFixedPartStateSupport, setConnectionFixedPartStateSupport] = useState(0);
  const [connectionVariablePartPrice, setConnectionVariablePartPrice] = useState(0);

  // Connection number setters
  useEffect(() => {
    setConnectionFixedPartPrice(connectionFixedPartPriceFromStorage);
  }, [connectionFixedPartPriceFromStorage]);
  useEffect(() => {
    if (connectionHasFixedPartStateSupportFromStorage) {
      setConnectionFixedPartStateSupport(connectionFixedPartStateSupportFromStorage);
    } else {
      setConnectionFixedPartStateSupport(0);
    }
  }, [connectionFixedPartStateSupportFromStorage, connectionHasFixedPartStateSupportFromStorage]);
  useEffect(() => {
    setConnectionVariablePartPrice(connectionVariablePartPriceFromStorage);
  }, [connectionVariablePartPriceFromStorage]);

  // Usage number atoms
  const [monthlyUsageFromStorage] = useAtom(monthlyUsageAtom);

  // Usage number states
  const [monthlyUsage, setMonthlyUsage] = useState(1);

  // Usage number setters
  useEffect(() => {
    setMonthlyUsage(monthlyUsageFromStorage);
  }, [monthlyUsageFromStorage]);

  // Market prices
  const { marketPrices } = useElectricityContext();

  // Render functions
  const renderMonthCount = useCallback(
    (value?: number) => (value === undefined ? '---' : value === 1 ? '1 month' : `${value} months`),
    [],
  );
  const renderPrice = useCallback(
    (price?: number, precision = 2) => {
      if (price === undefined) return '---';
      return (price * (includeVat ? 1.21 : 1)).toFixed(precision) + ' €';
    },
    [includeVat],
  );

  const connectionPrice =
    connectionFixedPartPrice - connectionFixedPartStateSupport + connectionVariablePartPrice * monthlyUsage;
  const monthlyFee = contract.fixedMonthlyFee.value;
  const tradingServicesFee = contract.tradingServices?.fee && contract.tradingServices?.fee * monthlyUsage;
  const productChangeFee =
    contract.productChange?.fee &&
    contract?.period &&
    contract.productChange?.period &&
    (contract.productChange.fee * contract.period) / contract.productChange.period;
  const terminationFee =
    contract.termination?.fee &&
    contract?.period &&
    contract.termination?.period &&
    (contract.termination.fee * contract.period) / contract.termination.period;

  const monthlyUsagePrice =
    product.priceSource === 'market'
      ? {
          min: (marketPrices?.yearlyMinPricePerKwh ?? 0) * monthlyUsage,
          max: (marketPrices?.yearlyMaxPricePerKwh ?? 0) * monthlyUsage,
        }
      : contract.onekWhPrice.value * monthlyUsage;

  return (
    <TableRow className='h-12'>
      <TableCell className='font-medium'>
        <div>{getLogo(provider.id)}</div>
      </TableCell>
      <TableCell>{product.name}</TableCell>
      <MonthlyBill connectionPrice={connectionPrice} monthlyUsagePrice={monthlyUsagePrice} monthlyFee={monthlyFee} />
      <TableCell>{contract.description}</TableCell>
      <TableCell className='text-center'>{renderMonthCount(contract.period)}</TableCell>
      <TableCell className='text-center'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className='relative'>
                {renderPrice(connectionPrice)} <InfoIcon />
              </span>
            </TooltipTrigger>
            <TooltipContent className='grid grid-cols-6 auto-rows-fr justify-items-end'>
              <p className='col-span-5'>Price for electricity supply of {monthlyUsage} kWh:</p>
              <p>+{renderPrice(connectionVariablePartPrice * monthlyUsage)}</p>
              <p className='col-span-5'>Power maintainance fee:</p>
              <p>+{renderPrice(connectionFixedPartPrice)}</p>
              <p className='col-span-5'>State support for household connections up to 25A (inclusive):</p>
              <p>-{renderPrice(connectionFixedPartStateSupport)}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
      <MonthlyUsagePrice monthlyUsagePrice={monthlyUsagePrice} fixed={contract.onekWhPrice.fixed} />
      <TableCell className='text-center'>
        {!contract.fixedMonthlyFee.notes ? (
          renderPrice(monthlyFee)
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className='relative'>
                  {renderPrice(monthlyFee)} <InfoIcon type='attention' />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{contract.fixedMonthlyFee.notes}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </TableCell>
      <TableCell className='text-center'>{renderPrice(tradingServicesFee)}</TableCell>
      <TableCell className='text-center'>
        {productChangeFee === undefined ? (
          renderPrice(productChangeFee)
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className='relative'>
                  {renderPrice(productChangeFee)} <InfoIcon />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Fee is reduced by {renderPrice(contract.productChange?.fee)} every{' '}
                  {renderMonthCount(contract.productChange?.period)}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </TableCell>
      <TableCell className='text-center'>
        {terminationFee === undefined ? (
          renderPrice(terminationFee)
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className='relative'>
                  {renderPrice(terminationFee)} <InfoIcon />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Fee is reduced by {renderPrice(contract.termination?.fee)} every{' '}
                  {renderMonthCount(contract.termination?.period)}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </TableCell>
    </TableRow>
  );
};

function getLogo(provider: string) {
  return <img src={`/img/logos/${provider.toLowerCase()}.png`} alt={provider} className='max-h-8 mr-2' />;
}
