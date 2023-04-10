import { useEffect, useState } from 'react';

import classNames from 'classnames';

import { AlchemicaUtils, CommonUtils } from 'utils';

import { parcelSurveyBarStyles } from './styles';

interface ParcelSurveyProps {
  currentAmount: number;
  surveySupply: number;
  surveysRatesByToken: number[];
  tokenName: string;
}

export function ParcelSurveyBar({ tokenName, currentAmount, surveySupply, surveysRatesByToken }: ParcelSurveyProps) {
  const classes = parcelSurveyBarStyles();

  const [supplyRate, setSupplyRate] = useState<number>(0);
  const [amountRate, setAmountRate] = useState<number>(0);

  useEffect(() => {
    if (surveysRatesByToken.length > 0) {
      const averageSummaryRate: number = AlchemicaUtils.getEverageFromArray(
        surveysRatesByToken,
        surveysRatesByToken.length
      );

      setSupplyRate(averageSummaryRate);
    }
  }, [surveysRatesByToken]);

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
