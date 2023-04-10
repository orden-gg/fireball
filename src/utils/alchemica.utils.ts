import { EthersApi } from 'api';

import { AlchemicaTypes } from 'shared/constants';
import { AlchemicaList, AlchemicaListTuple, AlchemicaTuple, ParcelSurvey, SurveyRound } from 'shared/models';

import averageSurveysData from 'data/surveys.data.json';

import { CitadelUtils } from './citadel.utils';
import { CommonUtils } from './common.utils';

export class AlchemicaUtils {
  public static getSurveyRate(survey: ParcelSurvey, size: number): AlchemicaList {
    const parcelName: string = CitadelUtils.getParcelSizeName(size);
    const averageSurvey: SurveyRound = survey.round
      ? averageSurveysData.round2_10[parcelName]
      : averageSurveysData.round1[parcelName];
    const surveyRate: AlchemicaList = {
      [AlchemicaTypes.Fud]: 0,
      [AlchemicaTypes.Fomo]: 0,
      [AlchemicaTypes.Alpha]: 0,
      [AlchemicaTypes.Kek]: 0
    };

    for (const type in averageSurvey) {
      surveyRate[type] = EthersApi.fromWei(survey[type]) / averageSurvey[type];
    }

    return surveyRate as AlchemicaList;
  }

  public static sortByTypes(surveysRate: AlchemicaList[]): AlchemicaListTuple {
    const summarySurveysRate: AlchemicaListTuple = {
      [AlchemicaTypes.Fud]: [0, 0, 0, 0],
      [AlchemicaTypes.Fomo]: [0, 0, 0, 0],
      [AlchemicaTypes.Alpha]: [0, 0, 0, 0],
      [AlchemicaTypes.Kek]: [0, 0, 0, 0]
    };

    for (const surveyRate of surveysRate) {
      for (const name in surveyRate) {
        summarySurveysRate[name].push(surveyRate[name]);
      }
    }

    return summarySurveysRate;
  }

  public static getSurveysRateByTypes(surveysRate: AlchemicaListTuple) {
    const summarySurveysRate: AlchemicaTuple = [0, 0, 0, 0];

    Object.keys(surveysRate).map((name: string, index: number) => {
      summarySurveysRate[index] = CommonUtils.summArray(surveysRate[name]);
    });

    return summarySurveysRate.map((item: number) => item / summarySurveysRate.length);
  }

  public static getCombinedSurveys(surveys: ParcelSurvey[]): AlchemicaList {
    return surveys.reduce(
      (previous: AlchemicaList, current: ParcelSurvey) => {
        for (const name in previous) {
          previous[name] += EthersApi.fromWei(current[name]);
        }

        return previous;
      },
      {
        [AlchemicaTypes.Fud]: 0,
        [AlchemicaTypes.Fomo]: 0,
        [AlchemicaTypes.Alpha]: 0,
        [AlchemicaTypes.Kek]: 0
      }
    );
  }
}
