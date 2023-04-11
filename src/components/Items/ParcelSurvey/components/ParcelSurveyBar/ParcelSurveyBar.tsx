import { useEffect, useState } from 'react';

import classNames from 'classnames';

import { CommonUtils } from 'utils';

import { parcelSurveyBarStyles } from './styles';

interface ParcelSurveyProps {
  currentAmount: number;
  surveySupply: number;
  tokenName: string;
  supplyRate: number;
}

export function ParcelSurveyBar({ tokenName, currentAmount, surveySupply, supplyRate }: ParcelSurveyProps) {
  const classes = parcelSurveyBarStyles();

  const [amountRate, setAmountRate] = useState<number>(0);

  useEffect(() => {
    const amountRate: number = Number((currentAmount / surveySupply).toFixed(2));

    setAmountRate(amountRate);
  }, [currentAmount, surveySupply]);

  return (
    <div className={classNames(classes.surveyAlchemica, classes[tokenName])} key={tokenName}>
      <div className={classes.surveyAlchemicaBar} style={{ width: `${amountRate * 100}%` }}>
        <span className={classes.amount}>{CommonUtils.convertFloatNumberToSuffixNumber(currentAmount)}</span>
      </div>
      <span className={classes.supplyRate}>x{supplyRate}</span>
    </div>
  );
}
