import { EthersApi } from 'api';

import { AlchemicaTypes } from 'shared/constants';
import { AlchemicaListTuple, AlchemicaTuple, ParcelAlchemica, ParcelSurvey, SurveyRound } from 'shared/models';

import { AlphaTokenIcon, FomoTokenIcon, FudTokenIcon, KekTokenIcon } from 'components/Icons/Icons';

import averageSurveysData from 'data/surveys.data.json';

import { CitadelUtils } from './citadel.utils';
import { CommonUtils } from './common.utils';

export class AlchemicaUtils {
  public static getSurveyRate(survey: ParcelSurvey, size: number): ParcelAlchemica {
    const parcelName: string = CitadelUtils.getParcelSizeName(size);
    const averageSurvey: SurveyRound = survey.round
      ? averageSurveysData.round2_10[parcelName]
      : averageSurveysData.round1[parcelName];
    const surveyRate: ParcelAlchemica = {
      [AlchemicaTypes.Fud]: 0,
      [AlchemicaTypes.Fomo]: 0,
      [AlchemicaTypes.Alpha]: 0,
      [AlchemicaTypes.Kek]: 0
    };

    for (const type in averageSurvey) {
      surveyRate[type] = Number((EthersApi.fromWei(survey[type]) / averageSurvey[type]).toFixed(2));
    }

    return surveyRate as ParcelAlchemica;
  }

  public static sortByTypes(surveysRate: ParcelAlchemica[]): AlchemicaListTuple {
    const summarySurveysRate: AlchemicaListTuple = {
      [AlchemicaTypes.Fud]: [],
      [AlchemicaTypes.Fomo]: [],
      [AlchemicaTypes.Alpha]: [],
      [AlchemicaTypes.Kek]: []
    };

    for (const surveyRate of surveysRate) {
      for (const name in surveyRate) {
        summarySurveysRate[name].push(surveyRate[name]);
      }
    }

    return summarySurveysRate;
  }

  public static getSurveysRateByTypes(surveysRate: AlchemicaListTuple): number[] {
    const summarySurveysRate: AlchemicaTuple = [0, 0, 0, 0];

    Object.keys(surveysRate).map((name: string, index: number) => {
      summarySurveysRate[index] = AlchemicaUtils.getEverageFromArray(surveysRate[name], surveysRate[name].length);
    });

    return summarySurveysRate;
  }

  public static getCombinedSurveys(surveys: ParcelSurvey[]): ParcelAlchemica {
    return surveys.reduce(
      (previous: ParcelAlchemica, current: ParcelSurvey) => {
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

  public static getIconByName(name: string): ({ width, height }) => JSX.Element {
    switch (name) {
      case AlchemicaTypes.Fud:
        return FudTokenIcon;
      case AlchemicaTypes.Fomo:
        return FomoTokenIcon;
      case AlchemicaTypes.Alpha:
        return AlphaTokenIcon;
      case AlchemicaTypes.Kek:
        return KekTokenIcon;
      default:
        return FudTokenIcon;
    }
  }

  public static getEverageFromArray(rates: number[], divider: number): number {
    return Number((CommonUtils.summArray(rates) / divider).toFixed(2));
  }

  public static getEverageFromObject(alchemicaRates: ParcelAlchemica): number {
    const rates: AlchemicaTuple = Object.values(alchemicaRates) as AlchemicaTuple;

    return Number((CommonUtils.summArray(rates) / rates.length).toFixed(2));
  }
}
