import { FC } from 'react';
import { atom, useAtom } from 'jotai';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { providerData } from '~/stores/electricityDataStore';
import { ElectricityComparisonRow } from './ElectricityComparisonRow';
import { Switch } from '~/components/ui/switch';
import { Label } from '~/components/ui/label';
import { ScrollArea, ScrollBar } from '~/components/ui/scroll-area';

export const includeVatAtom = atom(true);

export const ElectricityComparisonTable: FC = () => {
  const [includeVat, setIncludeVat] = useAtom(includeVatAtom);

  return (
    <div className='w-full'>
      <div className='flex items-center mb-4 mx-2'>
        <h2 className='text-lg font-bold'>Compare Provider Offers</h2>
        <div className='grow' />
        <Label htmlFor='includeVat' className='text-xs mr-2'>
          Include VAT
        </Label>
        <Switch id='includeVat' checked={includeVat} onCheckedChange={setIncludeVat} />
      </div>
      <ScrollArea className='w-[914px] border rounded-lg'>
        <Table className='w-max'>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>Provider</TableHead>
              <TableHead className='w-[120px]'>Product</TableHead>
              <TableHead className='w-[200px]'>Contract Description</TableHead>
              <TableHead className='text-base text-center font-semibold border bg-slate-700 border-slate-700 text-white'>
                Monthly Bill
              </TableHead>
              <TableHead className='text-center'>Contract Period</TableHead>
              <TableHead className='text-center'>Connection Price</TableHead>
              <TableHead className='text-center'>Monthly Usage Price</TableHead>
              <TableHead className='text-center'>Fixed Monthly Fee</TableHead>
              <TableHead className='text-center'>Trading Services Fee</TableHead>
              <TableHead className='text-center'>Product Change Fee</TableHead>
              <TableHead className='text-center'>Termination Fee</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {providerData.flatMap((provider, providerIndex) =>
              provider.products.flatMap((product, productIndex) =>
                product.contracts.map((contract, contractIndex) => (
                  <ElectricityComparisonRow
                    key={`${providerIndex}-${productIndex}-${contractIndex}`}
                    provider={provider}
                    product={product}
                    contract={contract}
                  />
                )),
              ),
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </div>
  );
};
