import { useEffect, useState } from 'react';

import classNames from 'classnames';

import { EthersApi } from 'api';

import { AlchemicaListTuple, ParcelAlchemica, ParcelSurvey as ParcelSurveyModel } from 'shared/models';

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

  const [averageRatesByToken, setAverageRatesByToken] = useState<number[]>([]);
  const [surveysRatesByToken, setSurveysRatesByToken] = useState<AlchemicaListTuple>();

  useEffect(() => {
    const isSurveyed: boolean = surveys?.length > 0;

    if (isSurveyed) {
      const surveysRatesByRounds: ParcelAlchemica[] = [];

      for (const survey of surveys) {
        surveysRatesByRounds.push(AlchemicaUtils.getSurveyRate(survey, size));
      }

      const surveysRatesByToken: AlchemicaListTuple = AlchemicaUtils.sortByTypes(surveysRatesByRounds);

      setSurveysRatesByToken(surveysRatesByToken);

      const totalSurveysSupply: ParcelAlchemica = AlchemicaUtils.getCombinedSurveys(surveys);

      setTotalSurveysSupply(totalSurveysSupply);

      const averageRatesByToken: number[] = AlchemicaUtils.getSurveysRateByTypes(surveysRatesByToken);

      setAverageRatesByToken(averageRatesByToken);
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
                x{AlchemicaUtils.getEverageFromArray(averageRatesByToken, averageRatesByToken.length)}
              </span>
            </CustomTooltip>
          </span>
          {totalSurveysSupply && surveysRatesByToken && (
            <>
              {Object.entries(totalSurveysSupply).map(([tokenName, amount], index: number) => (
                <ParcelSurveyBar
                  key={tokenName}
                  surveysRatesByToken={surveysRatesByToken[tokenName]}
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
