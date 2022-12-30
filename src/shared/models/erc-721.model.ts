export interface Erc721ListingsDictionary {
    [key: string]: {
        listingId: string;
        listingPrice: number;
        historicalPrices: string[];
    };
}
