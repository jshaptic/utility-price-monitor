import { FC } from 'react';
import { atom, useAtom } from 'jotai';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { electricityContextAtom } from '~/pages/ElectricityPage';

export const usageAtom = atom(
  (get) => get(electricityContextAtom).usage?.value,
  (get, set, usage: number) => {
    const electricityContext = get(electricityContextAtom);
    set(electricityContextAtom, { ...electricityContext, usage: { ...electricityContext.usage, value: usage } });
  },
);

export const unitAtom = atom(
  (get) => get(electricityContextAtom).usage?.unit ?? 'month',
  (get, set, unit: string) => {
    const electricityContext = get(electricityContextAtom);
    set(electricityContextAtom, { ...electricityContext, usage: { ...electricityContext.usage, unit } });
  },
);

export const monthlyUsageAtom = atom((get) => {
  const usage = get(usageAtom);
  const unit = get(unitAtom);
  if (!usage) return 1;
  if (unit === 'year') return usage / 12;
  if (unit === 'day') return usage * 30;
  if (unit === 'hour') return usage * 30 * 24;
  return usage;
});

export const ElectricityUsage: FC = () => {
  const [usage, setUsage] = useAtom(usageAtom);
  const [unit, setUnit] = useAtom(unitAtom);
  return (
    <form className='text-sm'>
      <fieldset className='flex flex-col gap-4 rounded-lg border p-4 h-full'>
        <legend className='-ml-1 px-1 font-medium'>Electricity Usage</legend>
        <div className='text-muted-foreground'>
          Specify your electricity usage to calculate the cost of the electricity and compare provider offers.
        </div>
        <div className='grid grid-cols-6 items-center gap-2'>
          <Label htmlFor='usage' className='col-span-1'>
            Usage
          </Label>
          <Input
            id='usage'
            type='number'
            value={usage}
            onChange={(e) => setUsage(+e.target.value)}
            className='col-span-2'
          />
          <Select value={unit} onValueChange={setUnit}>
            <SelectTrigger className='col-span-3'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='year'>kWh/year</SelectItem>
              <SelectItem value='month'>kWh/month</SelectItem>
              <SelectItem value='day'>kWh/day</SelectItem>
              <SelectItem value='hour'>kWh/hour</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </fieldset>
    </form>
  );
};
