import { FC } from "react";
import { IconInfoCircle, IconInfoTriangle } from "@tabler/icons-react";
import { cn } from '~/lib/utils';


type InfoIconProps = {
  type?: 'normal' | 'attention';
  className?: string;
};

export const InfoIcon: FC<InfoIconProps> = ({ type, className }) => {
  if (!type || type === 'normal') {
    return <IconInfoCircle size={14} className={cn('absolute -right-5 -top-1', className)} />;
  }
  if (type === 'attention') {
    return <IconInfoTriangle size={14} className={cn('absolute -right-5 -top-1 stroke-red-900', className)} />;
  }
};
