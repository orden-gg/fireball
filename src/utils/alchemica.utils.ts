import { EthersApi } from 'api';
import {
    AlchemicaTypes,
    AVERAGE_HUMBLE_BASE_ALCHEMICA,
    AVERAGE_PAARTNER_BASE_ALCHEMICA,
    AVERAGE_REASONABLE_BASE_ALCHEMICA,
    AVERAGE_SPACIOUS_BASE_ALCHEMICA,
    ParcelTypes
} from 'shared/constants';
import { ParcelSurvey, ParcelAlchemica } from 'shared/models';

export class AlchemicaUtils {
    public static getAvarageSurveyBySize(size: number) {
        switch (size) {
            case ParcelTypes.Humble:
                return AVERAGE_HUMBLE_BASE_ALCHEMICA;
            case ParcelTypes.Reasonable:
                return AVERAGE_REASONABLE_BASE_ALCHEMICA;
            case ParcelTypes.Paartners:
                return AVERAGE_PAARTNER_BASE_ALCHEMICA;
            default:
                return AVERAGE_SPACIOUS_BASE_ALCHEMICA;
        }
    }

    public static getCombinedSurveys(surveys: ParcelSurvey[]): ParcelAlchemica {
        return surveys.reduce(
            (previous: ParcelAlchemica, current: any) => {
                previous[AlchemicaTypes.Fud] =
                    previous[AlchemicaTypes.Fud] + EthersApi.fromWei(current[AlchemicaTypes.Fud]);
                previous[AlchemicaTypes.Fomo] =
                    previous[AlchemicaTypes.Fomo] + EthersApi.fromWei(current[AlchemicaTypes.Fomo]);
                previous[AlchemicaTypes.Alpha] =
                    previous[AlchemicaTypes.Alpha] + EthersApi.fromWei(current[AlchemicaTypes.Alpha]);
                previous[AlchemicaTypes.Kek] =
                    previous[AlchemicaTypes.Kek] + EthersApi.fromWei(current[AlchemicaTypes.Kek]);

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
