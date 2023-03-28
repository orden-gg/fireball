import { EthersApi } from 'api';

import { GhstTokenGif } from 'components/Icons/Icons';

import { styles } from './styles';

interface HorizontalPriceProps {
  item: CustomAny;
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
