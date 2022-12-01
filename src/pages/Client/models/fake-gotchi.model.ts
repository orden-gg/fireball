export interface FakeItemsDTO {
    ERC721tokens: FakeGotchi[];
    ERC1155balances: FakeGotchiCard[];
}

export interface FakeItemsVM {
    fakeGotchis: FakeGotchi[];
    fakeGotchiCards: FakeGotchiCard[];
}

export interface FakeGotchi {
    type: string;
    identifier: string;
    name: string;
    artistName: string;
    description: string;
    editions: number;
    thumbnailHash: string;
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
