import { atom, useAtom } from 'jotai';
import { currentConnectionAtom } from './ElectricityCurrentConnection';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { useEffect, useState } from 'react';

const data = [
  {
    provider: 'Alexela',
    product: 'Test',
    tariff: 3.92,
    tradingFee: 0.5,
    monthlyFee: 0.5,
    productChangeFee: 0.5,
    terminationFee: 0.5,
    total: 5.92,
  },
  {
    provider: 'Baltcom',
    product: 'Test',
    tariff: 2.71,
    tradingFee: 0.5,
    monthlyFee: 0.5,
    productChangeFee: 0.5,
    terminationFee: 0.5,
    total: 4.71,
  },
  {
    provider: 'Tet',
    product: 'Test',
    tariff: 8.71,
    tradingFee: 0.5,
    monthlyFee: 0.5,
    productChangeFee: 0.5,
    terminationFee: 0.5,
    total: 10.71,
  },
  {
    provider: 'Enefit',
    product: 'Test',
    tariff: 6.39,
    tradingFee: 0.5,
    monthlyFee: 0.5,
    productChangeFee: 0.5,
    terminationFee: 0.5,
    total: 8.39,
  },
  {
    provider: 'Elektrum',
    product: 'Test',
    tariff: 5.39,
    tradingFee: 0.5,
    monthlyFee: 0.5,
    productChangeFee: 0.5,
    terminationFee: 0.5,
    total: 7.39,
  },
  {
    provider: 'Elementary',
    product: 'Test',
    tariff: 4.39,
    tradingFee: 0.5,
    monthlyFee: 0.5,
    productChangeFee: 0.5,
    terminationFee: 0.5,
    total: 6.39,
  },
];

const connectionPriceAtom = atom((get) => {
  const connection = get(currentConnectionAtom);
  if (!connection) return 0;
  return connection.price;
});

function getLogo(provider: string) {
  return <img src={`/img/logos/${provider.toLowerCase()}.png`} alt={provider} className='max-h-8 mr-2' />;
}

export default function ElectricityProviderTable() {
  const [connectionPriceT] = useAtom(connectionPriceAtom);
  const [connectionPrice, setConnectionPrice] = useState(0);
  useEffect(() => {
    setConnectionPrice(connectionPriceT);
  }, [connectionPriceT]);
  return (
    <div>
      <h2 className='text-lg mb-4 font-bold'>Compare Providers</h2>
      <div className='border rounded-lg'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>Provider</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Tariff</TableHead>
              <TableHead>Trading Fee</TableHead>
              <TableHead>Monthly Fee</TableHead>
              <TableHead>Product Change Fee</TableHead>
              <TableHead>Termination Fee</TableHead>
              <TableHead className='text-right'>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, i) => (
              <TableRow key={i} className='h-12'>
                <TableCell className='font-medium'>
                  <div>{getLogo(row.provider)}</div>
                </TableCell>
                <TableCell>{row.product}</TableCell>
                <TableCell>{row.tariff}</TableCell>
                <TableCell>{row.tradingFee}</TableCell>
                <TableCell>{row.monthlyFee}</TableCell>
                <TableCell>{row.productChangeFee}</TableCell>
                <TableCell>{row.terminationFee}</TableCell>
                <TableCell className='text-right'>{connectionPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
