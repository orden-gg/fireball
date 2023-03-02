import { GhstTokenGif } from 'components/Icons/Icons';

import { EthersApi } from 'api';

import { styles } from './styles';

interface HorizontalPriceProps {
  item: any;
  label: string;
}

export function HorizontalPrice({ item, label }: HorizontalPriceProps) {
  const classes = styles();

  return (
    <div className={classes.priceRoot}>
      {label || ''}
      <GhstTokenGif width={25} height={25} />
      {EthersApi.fromWei(item.priceInWei)}
    </div>
  );
}
