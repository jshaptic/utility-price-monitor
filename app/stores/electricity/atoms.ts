import { atom } from 'jotai';
import { electricityContextAtom } from '~/pages/ElectricityPage';
import { commonData } from '~/stores/electricityDataStore';

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
  const connection = { ...defaultConfiguration, ...get(electricityContextAtom).connection };
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
  const connection = { ...defaultConfiguration, ...get(electricityContextAtom).connection };
  return commonData.variablePart.configurations.find((c) => c.plan === connection.plan);
});

export const variablePartPriceAtom = atom((get) => {
  const variablePart = get(variablePartAtom);
  if (!variablePart) return 0;
  return variablePart.price;
});

export const hasFixedPartStateSupportAtom = atom(false);
