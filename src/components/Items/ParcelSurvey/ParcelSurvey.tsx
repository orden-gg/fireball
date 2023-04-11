import { useEffect, useState } from 'react';

import classNames from 'classnames';

import { EthersApi } from 'api';

import { AlchemicaRoundsList, AlchemicaTuple, ParcelAlchemica, ParcelSurvey as ParcelSurveyModel } from 'shared/models';

import { CustomTooltip } from 'components/custom/CustomTooltip';

import { AlchemicaUtils } from 'utils';

import { ParcelSurveyBar } from './components';
import { parcelSurveyStyles } from './styles';

interface ParcelSurveyProps {
  alchemica: string[];
  size: number;
  surveys: ParcelSurveyModel[];
  className?: string;
}

export function ParcelSurvey({ surveys, alchemica, size, className }: ParcelSurveyProps) {
  const classes = parcelSurveyStyles();

  const [isSurveyed, setIsSurveyed] = useState<boolean>(false);
  const [totalSurveysSupply, setTotalSurveysSupply] = useState<ParcelAlchemica>();

  const [supplyRatesByToken, setSupplyRatesByToken] = useState<AlchemicaTuple>([0, 0, 0, 0]);
  const [surveysRatesByToken, setSurveysRatesByToken] = useState<AlchemicaRoundsList>();

  useEffect(() => {
    const isSurveyed: boolean = surveys?.length > 0;

    if (isSurveyed) {
      const surveysRatesByRounds: ParcelAlchemica[] = [];

      for (const survey of surveys) {
        surveysRatesByRounds.push(AlchemicaUtils.getSurveyRate(survey, size));
      }

      const surveysRatesByToken: AlchemicaRoundsList = AlchemicaUtils.sortByTypes(surveysRatesByRounds);

      setSurveysRatesByToken(surveysRatesByToken);

      const totalSurveysSupply: ParcelAlchemica = AlchemicaUtils.getTotalSurveys(surveys);

      setTotalSurveysSupply(totalSurveysSupply);

      const supplyRatesByToken: AlchemicaTuple = AlchemicaUtils.getTokensRate(totalSurveysSupply, surveys.length, size);

      setSupplyRatesByToken(supplyRatesByToken);
    }

    setIsSurveyed(isSurveyed);
  }, [surveys, size]);

  return surveys !== undefined ? (
    <div className={classNames(classes.surveyList, className)}>
      {isSurveyed ? (
        <>
          <span className={classes.surveyListHead}>
            <CustomTooltip placement='top' title={<>times surveyed</>} disableInteractive arrow>
              <span className={classes.surveyedTime}>{surveys.length}</span>
            </CustomTooltip>
            <CustomTooltip placement='top' title={<>total average</>} disableInteractive arrow>
              <span className={classes.rateAverage}>
                x{AlchemicaUtils.getEverageFromArray(supplyRatesByToken, supplyRatesByToken.length)}
              </span>
            </CustomTooltip>
          </span>
          {totalSurveysSupply && surveysRatesByToken && (
            <>
              {Object.entries(totalSurveysSupply).map(([tokenName, amount], index: number) => (
                <ParcelSurveyBar
                  key={tokenName}
                  supplyRate={supplyRatesByToken[index]}
                  tokenName={tokenName}
                  currentAmount={EthersApi.fromWei(alchemica[index])}
                  surveySupply={amount}
                />
              ))}
            </>
          )}
        </>
      ) : (
        <span className={classes.surveyListHead}>
          <span className={classNames(classes.surveyedTime, classes.textCenter)}>not surveyed</span>
        </span>
      )}
    </div>
  ) : (
    <></>
  );
}
