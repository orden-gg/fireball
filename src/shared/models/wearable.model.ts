import { WearableItemTypes, WerableBenefitTypes } from 'shared/constants';

import { Erc1155Item } from './erc-1155-item.model';

export interface WearableBenefit {
    id: number;
    name: string;
    itemType: WearableItemTypes;
    benefit: {
        first: WerableBenefitTypes;
        second: WerableBenefitTypes;
    };
}

export interface GlossaryWearable extends Erc1155Item {
    benefit: {
        first: WerableBenefitTypes | undefined;
        second: WerableBenefitTypes | undefined;
    },
    itemType: WearableItemTypes | undefined;
}
