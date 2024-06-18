import { FC, useCallback, useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { TableCell, TableRow } from '~/components/ui/table';
import { includeVatAtom } from './ElectricityComparisonTable';
import { monthlyUsageAtom } from './ElectricityUsage';
import {
  fixedPartPriceAtom as connectionFixedPartPriceAtom,
  fixedPartDiscountAtom as connectionFixedPartDiscountAtom,
  hasFixedPartDiscountAtom as connectionHasFixedPartDiscountAtom,
  variablePartPriceAtom as connectionVariablePartPriceAtom,
} from './ElectricityCurrentConnection';

type Props = {
  provider: {
    id: string;
    name: string;
  };
  product: {
    name: string;
    onekWhPrice: {
      value: number;
      fixed: boolean;
    };
  };
  contract: {
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
  };
};

export const ElectricityComparisonRow: FC<Props> = ({ provider, product, contract }) => {
  const [includeVat] = useAtom(includeVatAtom);

  // Connection number atoms
  const [connectionFixedPartPriceFromStorage] = useAtom(connectionFixedPartPriceAtom);
  const [connectionFixedPartDiscountFromStorage] = useAtom(connectionFixedPartDiscountAtom);
  const [connectionHasFixedPartDiscountFromStorage] = useAtom(connectionHasFixedPartDiscountAtom);
  const [connectionVariablePartPriceFromStorage] = useAtom(connectionVariablePartPriceAtom);

  // Connection number states
  const [connectionFixedPartPrice, setConnectionFixedPartPrice] = useState(0);
  const [connectionFixedPartDiscount, setConnectionFixedPartDiscount] = useState(0);
  const [connectionVariablePartPrice, setConnectionVariablePartPrice] = useState(0);

  // Connection number setters
  useEffect(() => {
    setConnectionFixedPartPrice(connectionFixedPartPriceFromStorage);
  }, [connectionFixedPartPriceFromStorage]);
  useEffect(() => {
    if (connectionHasFixedPartDiscountFromStorage) {
      setConnectionFixedPartDiscount(connectionFixedPartDiscountFromStorage);
    } else {
      setConnectionFixedPartDiscount(0);
    }
  }, [connectionFixedPartDiscountFromStorage, connectionHasFixedPartDiscountFromStorage]);
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

  // Render functions
  const renderNumber = useCallback((value?: number) => (value === undefined ? '---' : value), []);
  const renderPrice = useCallback(
    (price?: number, precision = 2) => {
      if (price === undefined) return '---';
      return (price * (includeVat ? 1.21 : 1)).toFixed(precision) + ' €';
    },
    [includeVat],
  );

  const connectionPrice =
    connectionFixedPartPrice - connectionFixedPartDiscount + connectionVariablePartPrice * monthlyUsage;
  const totalMonthlyBill = connectionPrice + product.onekWhPrice.value * monthlyUsage + contract.fixedMonthlyFee.value;
  const usagePrice = product.onekWhPrice.value * monthlyUsage;
  const monthlyFee = contract.fixedMonthlyFee.value;
  const tradingServicesFee = contract.tradingServices?.fee && contract.tradingServices?.fee * monthlyUsage;
  const productChangeFee = contract.productChange?.fee;
  const terminationFee = contract.termination?.fee;

  return (
    <TableRow className='h-12'>
      <TableCell className='font-medium'>
        <div>{getLogo(provider.id)}</div>
      </TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell>{contract.description}</TableCell>
      <TableCell className='text-base text-center font-semibold border bg-slate-700 border-slate-700 text-white'>
        {renderPrice(totalMonthlyBill)}
      </TableCell>
      <TableCell className='text-center'>{renderNumber(contract.period)}</TableCell>
      <TableCell className='text-center'>{renderPrice(connectionPrice)}</TableCell>
      <TableCell className='text-center'>{renderPrice(usagePrice)}</TableCell>
      <TableCell className='text-center'>{renderPrice(monthlyFee)}</TableCell>
      <TableCell className='text-center'>{renderPrice(tradingServicesFee)}</TableCell>
      <TableCell className='text-center'>{renderPrice(productChangeFee)}</TableCell>
      <TableCell className='text-center'>{renderPrice(terminationFee)}</TableCell>
    </TableRow>
  );
};

function getLogo(provider: string) {
  return <img src={`/img/logos/${provider.toLowerCase()}.png`} alt={provider} className='max-h-8 mr-2' />;
}
