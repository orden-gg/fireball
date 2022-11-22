export interface FakeItemsDTO {
    ERC721tokens: {
        identifier: string;
        metadata: {
            name: string;
            thumbnailHash: string;
            description: string;
        };
    }[];
    ERC1155balances: {
        id: string;
        valueExact: string;
    }[];
}

export interface FakeItemsVM {
    fakeGotchis: FakeGotchi[];
    fakeGotchiCard: FakeGotchiCard;
}

export interface FakeGotchi {
    identifier: string;
    name: string;
    thumbnailHash: string;
    description: string;
}

export interface FakeGotchiCard {
    id: string;
    valueExact: number;
}
