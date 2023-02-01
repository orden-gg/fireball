import classNames from 'classnames';

import { GhstTokenIcon } from 'components/Icons/Icons';

import { priceStyles } from './styles';

interface HistoryPriceProps {
  price: number;
  className?: string;
}

export function HistoryPrice({ price, className }: HistoryPriceProps) {
  const classes = priceStyles();

  return (
    <div className={classNames(classes.price, className)}>
      {price} <GhstTokenIcon height={15} width={15} />
    </div>
  );
}
