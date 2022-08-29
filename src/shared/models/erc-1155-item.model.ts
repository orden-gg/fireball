import { Erc1155NumberCategories, WearableItemTypes, WerableBenefitTypes } from 'shared/constants';

export interface TraitModifiers {
    nrg: number;
    agg: number;
    spk: number;
    brn: number;
    eys: number;
    eyc: number;
}

type TraitModifiersTuple = [
    nrg: number,
    agg: number,
    spk: number,
    brn: number,
    eys: number,
    eyc: number
];

export interface SlotPositions {
    body: boolean;
    face: boolean;
    eyes: boolean;
    head: boolean;
    lHand: boolean;
    rHand: boolean;
    pet: boolean;
    background: boolean;
    unknownSlot1: boolean;
    unknownSlot2: boolean;
    unknownSlot3: boolean;
    unknownSlot4: boolean;
    unknownSlot5: boolean;
    unknownSlot6: boolean;
    unknownSlot7: boolean;
    unknownSlot8: boolean;
}

type SlotPositionsTuple = [
    body: boolean,
    face: boolean,
    eyes: boolean,
    head: boolean,
    lHand: boolean,
    rHand: boolean,
    pet: boolean,
    background: boolean,
    unknownSlot1: boolean,
    unknownSlot2: boolean,
    unknownSlot3: boolean,
    unknownSlot4: boolean,
    unknownSlot5: boolean,
    unknownSlot6: boolean,
    unknownSlot7: boolean,
    unknownSlot8: boolean
];

export interface Erc1155Dimensions {
    x: number,
    y: number,
    width: number,
    height: number
}

type Erc1155DimensionsTuple = [
    x: number,
    y: number,
    width: number,
    height: number
];

export type Erc1155ItemTuple = [
    name: string,
    description: string,
    author: string,
    traitModifiers: TraitModifiersTuple,
    slotPositions: SlotPositionsTuple,
    allowedCollaterals: unknown[],
    dimensions: Erc1155DimensionsTuple,
    ghstPrice: number,
    maxQuantity: number,
    totalQuantity: number,
    svgId: number,
    rarityScoreModifier: number,
    canPurchaseWithGhst: boolean,
    minLevel: number,
    canBeTransferred: boolean,
    category: Erc1155NumberCategories,
    kinshipBonus: number,
    experienceBonus: number
]

export interface Erc1155Listing {
    id: number | null;
    price: number;
    lastPurchased: number | null;
}

export interface Erc1155SoldListing extends Erc1155Listing {
    soldDate?: string | null;
}

export interface Erc1155Item {
    id: number;
    name: string;
    description: string;
    author: string;
    traitModifiers: TraitModifiers;
    slotPositions: SlotPositions;
    allowedCollaterals: unknown[];
    dimensions: Erc1155Dimensions;
    ghstPrice: number;
    maxQuantity: number;
    totalQuantity: number;
    svgId: number;
    rarityScoreModifier: number;
    canPurchaseWithGhst: boolean;
    minLevel: number;
    canBeTransferred: boolean;
    category: Erc1155NumberCategories;
    kinshipBonus: number;
    experienceBonus: number;
    rarity: string;
    rarityId: string;
    benefit: {
        first: WerableBenefitTypes | undefined;
        second: WerableBenefitTypes | undefined;
    },
    itemType: WearableItemTypes | undefined;
    listingPrice?: number;
    lastSoldListing?: Erc1155SoldListing;
    currentListing?: Erc1155Listing;
}
