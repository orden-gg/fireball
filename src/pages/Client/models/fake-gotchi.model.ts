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
    publisherName: string;
    description: string;
    editions: number;
    thumbnailHash: string;
}

export interface FakeGotchiCard {
    type: string;
    id: string;
    valueExact: number;
}
