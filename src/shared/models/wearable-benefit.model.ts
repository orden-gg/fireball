import { WearableItemTypes, WerableBenefitTypes } from 'shared/constants';

export interface WearableBenefit {
    id: number;
    name: string;
    itemType: WearableItemTypes;
    benefit: {
        first: WerableBenefitTypes;
        second: WerableBenefitTypes;
    };
}
