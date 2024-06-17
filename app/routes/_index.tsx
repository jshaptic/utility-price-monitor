import type { MetaFunction } from '@remix-run/node';
import { useState } from 'react';
import GasTable from '~/components/GasTable';
import { Card } from '~/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { ElectricityPage } from '~/pages/ElectricityPage';

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export default function Index() {
  const [utilityType, setUtilityType] = useState('electricity');

  const getUtilityTable = () => {
    switch (utilityType) {
      case 'electricity':
        return <ElectricityPage />;
      case 'gas':
        return <GasTable />;
    }
    return null;
  };

  return (
    <div className='relative grid grid-cols-8 gap-8 w-full max-w-screen-xl'>
      <div className='col-span-6'>
        <div className='flex justify-between'>
          <h2 className='text-xl font-bold'>Electricity</h2>
          <Tabs defaultValue='electricity' onValueChange={setUtilityType}>
            <TabsList>
              <TabsTrigger value='electricity'>Electricity</TabsTrigger>
              <TabsTrigger value='gas'>Natural Gas</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        {getUtilityTable()}
      </div>
      <Card className='fixed h-[calc(100%-64px)] w-72 justify-self-end' />
    </div>
  );
}
