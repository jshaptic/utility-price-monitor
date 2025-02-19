import { useCallback } from 'react';

export const usePriceRenderer = ({ includeVat }: { includeVat: boolean }) => {
  const renderPrice = useCallback((price?: number, precision = 2) => {
    if (price === undefined) return '---';
    return (price * (includeVat ? 1.21 : 1)).toFixed(precision) + ' €';
  }, [includeVat]);

  return { renderPrice };
};
