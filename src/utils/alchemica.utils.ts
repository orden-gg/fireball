import {
    AVERAGE_HUMBLE_BASE_ALCHEMICA,
    AVERAGE_PAARTNER_BASE_ALCHEMICA,
    AVERAGE_REASONABLE_BASE_ALCHEMICA,
    AVERAGE_SPACIOUS_BASE_ALCHEMICA,
    ParcelTypes
} from 'shared/constants';

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
}
