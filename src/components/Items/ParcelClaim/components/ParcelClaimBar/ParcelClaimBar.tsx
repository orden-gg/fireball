import { useEffect, useState } from 'react';

import classNames from 'classnames';

import { CommonUtils } from 'utils';

import { parcelClaimBarStyles } from './styles';

interface ParcelClaimProps {
  tokenName: string;
  currentAmount: number;
  capacities: number;
  supplyRate: number;
}

export function ParcelClaimBar({ tokenName, currentAmount, capacities, supplyRate }: ParcelClaimProps) {
  const classes = parcelClaimBarStyles();

  const [amountRate, setAmountRate] = useState<number>(0);

  useEffect(() => {
    const amountRate: number = Number((currentAmount / capacities).toFixed(2));

    setAmountRate(amountRate);
  }, [currentAmount, capacities]);

  return (
    <div className={classNames(classes.claimAlchemica, classes[tokenName])} key={tokenName}>
      <div className={classes.claimAlchemicaBar} style={{ width: `${amountRate * 100}%` }}>
        <span className={classes.amount}>{CommonUtils.convertFloatNumberToSuffixNumber(currentAmount)}</span>
      </div>
      <span className={classes.supplyRate}>{supplyRate}</span>
      <span className={classes.capacities}>{capacities}</span>
    </div>
  );
}
