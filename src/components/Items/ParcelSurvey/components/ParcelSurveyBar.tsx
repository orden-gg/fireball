import { useEffect, useState } from 'react';

import classNames from 'classnames';

import { CommonUtils } from 'utils';

import { parcelSurveyStyles } from '../styles';

interface ParcelSurveyProps {
  currentAmount: number;
  surveySupply: number;
  surveysRate: number[];
  tokenName: string;
}

export function ParcelSurveyBar({ tokenName, currentAmount, surveySupply, surveysRate }: ParcelSurveyProps) {
  const classes = parcelSurveyStyles();

  const [supplyRate, setSupplyRate] = useState<number>(0);
  const [amountRate, setAmountRate] = useState<number>(0);

  useEffect(() => {
    if (surveysRate.length > 0) {
      const averageSummaryRate: number = CommonUtils.summArray(surveysRate) / 2;

      setSupplyRate(Number(averageSummaryRate.toFixed(2)));
    }
  }, [surveysRate]);

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
