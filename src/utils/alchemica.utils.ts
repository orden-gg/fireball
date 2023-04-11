import { EthersApi } from 'api';

import { AlchemicaTypes, FIRST_ROUND_AVERAGE, OTHER_ROUNDS_AVERAGE, ZERO_ALCHEMICA_LIST } from 'shared/constants';
import { AlchemicaRoundsList, AlchemicaTuple, ParcelAlchemica, ParcelSurvey } from 'shared/models';

import surveyTotal from 'data/surveys.data.json';

import { CitadelUtils } from './citadel.utils';
import { CommonUtils } from './common.utils';

export class AlchemicaUtils {
  public static getSurveyRate(survey: ParcelSurvey, size: number): ParcelAlchemica {
    const parcelName: string = CitadelUtils.getParcelSizeName(size);
    const averageSurvey: ParcelAlchemica = AlchemicaUtils.getTokenAverageByRound(parcelName, survey.round);

    for (const type in averageSurvey) {
      averageSurvey[type] = Number((EthersApi.fromWei(survey[type]) / averageSurvey[type]).toFixed(2));
    }

    return averageSurvey;
  }

  public static getTokenAverageByRound(parcelName: string, round: number): ParcelAlchemica {
    const averagePercentage: number = round ? OTHER_ROUNDS_AVERAGE : FIRST_ROUND_AVERAGE;
    const surveyTotalByName: ParcelAlchemica = surveyTotal[parcelName];
    const averageSurvey: ParcelAlchemica = { ...ZERO_ALCHEMICA_LIST };

    for (const key in surveyTotalByName) {
      averageSurvey[key] = (surveyTotalByName[key] / 100) * averagePercentage;
    }

    return averageSurvey;
  }

  public static sortByTypes(surveysRate: ParcelAlchemica[]): AlchemicaRoundsList {
    const summarySurveysRate: AlchemicaRoundsList = {
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

  public static getTokensRate(totalSurveysSupply: ParcelAlchemica, rounds: number, size: number): AlchemicaTuple {
    const parcelName: string = CitadelUtils.getParcelSizeName(size);
    const averageSurveys: ParcelAlchemica[] = [];

    const roundsIdArray: number[] = [...Array(rounds).keys()];

    for (const round of roundsIdArray) {
      averageSurveys.push(AlchemicaUtils.getTokenAverageByRound(parcelName, round));
    }

    return Object.entries(totalSurveysSupply).map(([name, value]: [string, number]) => {
      const averageSum: number = roundsIdArray.reduce(
        (previous: number, current: number) => previous + averageSurveys[current][name],
        0
      );

      return Number((value / averageSum).toFixed(2));
    }) as AlchemicaTuple;
  }

  public static getTotalSurveys(surveys: ParcelSurvey[]): ParcelAlchemica {
    return surveys.reduce(
      (previous: ParcelAlchemica, current: ParcelSurvey) => {
        for (const name in previous) {
          previous[name] += EthersApi.fromWei(current[name]);
        }

        return previous;
      },
      { ...ZERO_ALCHEMICA_LIST }
    );
  }

  public static getEverageFromArray(rates: number[], divider: number): number {
    return Number((CommonUtils.summArray(rates) / divider).toFixed(2));
  }

  public static getEverageFromObject(alchemicaRates: ParcelAlchemica): number {
    const rates: AlchemicaTuple = Object.values(alchemicaRates) as AlchemicaTuple;

    return Number((CommonUtils.summArray(rates) / rates.length).toFixed(2));
  }
}
