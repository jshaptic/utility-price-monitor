import { FC, useEffect, useMemo, useState } from 'react';
import { atom, useAtom } from 'jotai';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Label } from '~/components/ui/label';
import { commonData } from '~/stores/electricityDataStore';
import { electricityContextAtom } from '~/pages/ElectricityPage';
import { Switch } from '~/components/ui/switch';

export const defaultConfiguration = {
  plan: 'Basic',
  phases: '1',
  amperage: '16A',
};

export const planAtom = atom(
  (get) => get(electricityContextAtom).connection?.plan ?? defaultConfiguration.plan,
  (get, set, plan: string) => {
    const electricityContext = get(electricityContextAtom);
    set(electricityContextAtom, { ...electricityContext, connection: { ...electricityContext.connection, plan } });
  },
);

export const phasesAtom = atom(
  (get) => get(electricityContextAtom).connection?.phases ?? defaultConfiguration.phases,
  (get, set, phases: string) => {
    const electricityContext = get(electricityContextAtom);
    set(electricityContextAtom, { ...electricityContext, connection: { ...electricityContext.connection, phases } });
  },
);

export const amperageAtom = atom(
  (get) => get(electricityContextAtom).connection?.amperage ?? defaultConfiguration.amperage,
  (get, set, amperage: string) => {
    const electricityContext = get(electricityContextAtom);
    set(electricityContextAtom, { ...electricityContext, connection: { ...electricityContext.connection, amperage } });
  },
);

export const fixedPartAtom = atom((get) => {
  const connection = get(electricityContextAtom).connection;
  if (!connection) return;
  return commonData.fixedPart.configurations.find(
    (c) =>
      c.plan === connection.plan &&
      c.phases.toString() === connection.phases &&
      c.amperage + 'A' === connection.amperage,
  );
});

export const fixedPartPriceAtom = atom((get) => {
  const fixedPart = get(fixedPartAtom);
  if (!fixedPart) return 0;
  return fixedPart.price;
});

export const fixedPartStateSupportAtom = atom((get) => {
  const fixedPart = get(fixedPartAtom);
  if (!fixedPart) return 0;
  return fixedPart.stateSupport ?? 0;
});

export const variablePartAtom = atom((get) => {
  const connection = get(electricityContextAtom).connection;
  if (!connection) return;
  return commonData.variablePart.configurations.find((c) => c.plan === connection.plan);
});

export const variablePartPriceAtom = atom((get) => {
  const variablePart = get(variablePartAtom);
  if (!variablePart) return 0;
  return variablePart.price;
});

export const hasFixedPartStateSupportAtom = atom(false);

export const ElectricityCurrentConnection: FC = () => {
  const [plan, setPlan] = useAtom(planAtom);
  const [phases, setPhases] = useAtom(phasesAtom);
  const [amperage, setAmperage] = useAtom(amperageAtom);

  const [fixedPartStateSupport] = useAtom(fixedPartStateSupportAtom);
  const [hasFixedPartStateSupport, setHasFixedPartStateSupport] = useAtom(hasFixedPartStateSupportAtom);
  const [hasFixedPartStateSupportOption, setHasFixedPartStateSupportOption] = useState(false);

  useEffect(() => {
    setHasFixedPartStateSupport(fixedPartStateSupport > 0);
    setHasFixedPartStateSupportOption(fixedPartStateSupport > 0);
  }, [fixedPartStateSupport, setHasFixedPartStateSupport]);

  const planList = useMemo(() => [...new Set(commonData.fixedPart.configurations.map((c) => c.plan))], []);

  const phaseList = useMemo(
    () => [...new Set(commonData.fixedPart.configurations.map((c) => c.phases.toString()))],
    [],
  );

  const amperageList = useMemo(() => {
    const list = [
      ...new Set(
        commonData.fixedPart.configurations
          .filter((c) => (c.plan === plan || !plan) && (c.phases.toString() === phases || !phases))
          .map((c) => c.amperage + 'A'),
      ),
    ];
    if (!list.includes(amperage)) {
      setAmperage('');
    }
    return list;
  }, [plan, phases, amperage, setAmperage]);

  return (
    <form className='text-sm'>
      <fieldset className='flex flex-col gap-4 rounded-lg border p-4 h-full'>
        <legend className='-ml-1 px-1 font-medium'>Current Electricity Connection</legend>
        <div className='text-muted-foreground'>
          Select the amperage, number of phases, and your electricity connection plan. This information should be
          available in your contract with the current provider or on their website.
        </div>
        <div className='grid auto-rows-fr gap-4'>
          <div className='grid grid-cols-7 items-center'>
            <Label htmlFor='plan' className='col-span-3'>
              Plan
            </Label>
            <Select defaultValue={defaultConfiguration.plan} onValueChange={setPlan} value={plan}>
              <SelectTrigger id='plan' className='col-span-4'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {planList?.map((plan, index) => (
                  <SelectItem key={index} value={plan}>
                    {plan}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='grid grid-cols-7 items-center'>
            <Label htmlFor='phases' className='col-span-3'>
              Phase Count
            </Label>
            <Select defaultValue={defaultConfiguration.phases} onValueChange={setPhases} value={phases}>
              <SelectTrigger id='phases' className='col-span-4'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {phaseList?.map((phases, index) => (
                  <SelectItem key={index} value={phases}>
                    {phases}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='grid grid-cols-7 items-center'>
            <Label htmlFor='amperage' className='col-span-3'>
              Amperage
            </Label>
            <Select defaultValue={defaultConfiguration.amperage} onValueChange={setAmperage} value={amperage}>
              <SelectTrigger id='amperage' className='col-span-4'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {amperageList?.map((amperage, index) => (
                  <SelectItem key={index} value={amperage}>
                    {amperage}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='grid grid-cols-7 items-center'>
            <Label htmlFor='stateSupport' className='col-span-3'>
              State Support
            </Label>
            <Switch
              id='stateSupport'
              checked={hasFixedPartStateSupport}
              onCheckedChange={setHasFixedPartStateSupport}
              disabled={!hasFixedPartStateSupportOption}
              className='col-span-4'
            />
          </div>
        </div>
      </fieldset>
    </form>
  );
};
