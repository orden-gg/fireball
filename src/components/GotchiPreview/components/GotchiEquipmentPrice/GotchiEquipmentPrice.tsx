import { GhstTokenIcon } from 'components/Icons/Icons';

import { CommonUtils } from 'utils';

import { gotchiEquipmentPriceStyles } from './styles';

export function GotchiEquipmentPrice({ price }: { price: number }) {
  const classes = gotchiEquipmentPriceStyles();

  return price > 0 ? (
    <p className={classes.totalPrice}>
      equipment value: {CommonUtils.convertFloatNumberToSuffixNumber(price)}
      <GhstTokenIcon width={14} height={14} className={classes.icon} />
    </p>
  ) : (
    <></>
  );
}
