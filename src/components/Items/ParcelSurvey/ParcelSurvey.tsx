import { useEffect, useState } from 'react';

import classNames from 'classnames';

import { EthersApi } from 'api';

import { AlchemicaList, AlchemicaListTuple, ParcelAlchemica, ParcelSurvey as ParcelSurveyModel } from 'shared/models';

import { CustomTooltip } from 'components/custom/CustomTooltip';

import { AlchemicaUtils, CommonUtils } from 'utils';

import { ParcelSurveyBar } from './components/ParcelSurveyBar';
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
  const [averageRate, setAverageRate] = useState<number>(0);
  const [totalSurveysSupply, setTotalSurveysSupply] = useState<ParcelAlchemica>();
  const [surveysRate, setSurveysRate] = useState<AlchemicaListTuple>();

  useEffect(() => {
    const isSurveyed: boolean = surveys?.length > 0;

    if (isSurveyed) {
      const surveysRate: AlchemicaList[] = [];

      for (const survey of surveys) {
        surveysRate.push(AlchemicaUtils.getSurveyRate(survey, size));
      }

      const sortedSurveysRate: AlchemicaListTuple = AlchemicaUtils.sortByTypes(surveysRate);

      setSurveysRate(sortedSurveysRate);

      const totalSurveysSupply: ParcelAlchemica = AlchemicaUtils.getCombinedSurveys(surveys);

      setTotalSurveysSupply(totalSurveysSupply);

      const averageRate: number =
        CommonUtils.summArray(AlchemicaUtils.getSurveysRateByTypes(sortedSurveysRate)) / surveys.length;

      setAverageRate(averageRate);
    }

    setIsSurveyed(isSurveyed);
  }, [surveys, size]);

  if (surveys === undefined) {
    return <></>;
  }

  return (
    <div className={classNames(classes.surveyList, className)}>
      {isSurveyed ? (
        <>
          <span className={classes.surveyListHead}>
            <CustomTooltip placement='top' title={<>times surveyed</>} disableInteractive arrow>
              <span className={classes.surveyedTime}>{surveys.length}</span>
            </CustomTooltip>
            <CustomTooltip placement='top' title={<>total average</>} disableInteractive arrow>
              <span className={classes.rateAverage}>x{Number(averageRate.toFixed(2))}</span>
            </CustomTooltip>
          </span>
          {totalSurveysSupply &&
            surveysRate &&
            Object.entries(totalSurveysSupply).map(([tokenName, amount], index: number) => (
              <ParcelSurveyBar
                key={tokenName}
                surveysRate={surveysRate[tokenName]}
                tokenName={tokenName}
                currentAmount={EthersApi.fromWei(alchemica[index])}
                surveySupply={amount}
              />
            ))}
        </>
      ) : (
        <span className={classes.surveyListHead}>
          <span className={classNames(classes.surveyedTime, classes.textCenter)}>not surveyed</span>
        </span>
      )}
    </div>
  );
}
