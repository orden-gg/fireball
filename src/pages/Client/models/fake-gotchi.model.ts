import { FakeGotchi } from 'shared/models';

export interface FakeItemsDTO {
    ERC721tokens: FakeGotchi[];
    ERC1155balances: FakeGotchiCard[];
}

export interface FakeItemsVM {
    fakeGotchis: FakeGotchi[];
    fakeGotchiCards: FakeGotchiCard[];
}

export interface FakeGotchiCard {
    type: string;
    id: string;
    valueExact: number;
}

export interface FakeGotchiCardListingDTO {
    id: string;
    priceInWei: string;
}

export interface FakeGotchiCardLastSoldListingDTO extends FakeGotchiCardListingDTO {
    timeLastPurchased: string;
}
