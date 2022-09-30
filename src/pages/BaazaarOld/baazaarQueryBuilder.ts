import { ListingTypes } from 'shared/constants';

export const getQueries = (selectedGoodsType: any, listingType: any): string[] => {
    const getQuery = (params: any, selectedGoodsType: any, listingType: any): string => {
        return `{
            ${params.ercType}(
                first: 1000,
                where: {
                    category: ${params.category},
                    ${getWhereParams(selectedGoodsType, listingType).map((item) => {
                return item + ',';
            })}
                },
                ${getOrderParams(selectedGoodsType, listingType).map((item) => {
                return item + ',';
            })}
            ) {
                __typename
                ${params.params}
            }
        }`;
    };

    const queries: string[] = [];
    let params: any;

    if (listingType === ListingTypes.All) {
        [
            ListingTypes.ClosedPortal,
            ListingTypes.OpenedPortal,
            ListingTypes.Aavegotchi,
            ListingTypes.Wearable,
            ListingTypes.Consumable,
            ListingTypes.Tickets,
            ListingTypes.Realm
        ].forEach((item: string) => {
            params = getParamsForSelectedType(selectedGoodsType, item);
            queries.push(getQuery(params, selectedGoodsType, item));
        });
    } else {
        params = getParamsForSelectedType(selectedGoodsType, listingType);
        queries.push(getQuery(params, selectedGoodsType, listingType));
    }

    return queries;
};

const getParamsForSelectedType = (selectedGoodsType: any, listingType: any): any => {
    const getErcTypeFor1155Listing = (selectedGoodsType: any): any => {
        return [ListingTypes.Activity,
            ListingTypes.Sold,
            ListingTypes.Purchased
        ].indexOf(selectedGoodsType) === -1 ? 'erc1155Listings' : 'erc1155Purchases';
    };

    const getParamsForErc1155Listing = (params: any, params2: any): any => {
        return [ListingTypes.Activity,
            ListingTypes.Sold,
            ListingTypes.Purchased
        ].indexOf(selectedGoodsType) === -1 ? params : params2;
    };

    const map: any = {
        [ListingTypes.ClosedPortal]: {
            ercType: 'erc721Listings',
            category: '0',
            params: `
                id
                tokenId
                category
                blockCreated
                priceInWei
                seller
                timePurchased
                timeCreated
                portal {
                    hauntId
                    timesTraded
                    owner
                }
                parcel {
                    size
                    district
                    fomoBoost
                    fudBoost
                    kekBoost
                    alphaBoost
                    timesTraded
                    parcelId
                    parcelHash
                }
                gotchi {
                    id
                    name
                    collateral
                    modifiedNumericTraits
                    stakedAmount
                    hauntId
                    kinship
                    modifiedRarityScore
                    baseRarityScore
                    level
                    experience
                    owner {id}
                    equippedWearables
                    numericTraits
                }`
        },
        [ListingTypes.OpenedPortal]: {
            ercType: 'erc721Listings',
            category: '2',
            params: `
                id
                tokenId
                category
                blockCreated
                priceInWei
                seller
                timePurchased
                timeCreated
                portal {
                    hauntId
                    timesTraded
                    owner
                }
                parcel {
                    size
                    district
                    fomoBoost
                    fudBoost
                    kekBoost
                    alphaBoost
                    timesTraded
                    parcelId
                    parcelHash
                }
                gotchi {
                    id
                    name
                    collateral
                    modifiedNumericTraits
                    stakedAmount
                    hauntId
                    kinship
                    modifiedRarityScore
                    baseRarityScore
                    level
                    experience
                    owner {id}
                    equippedWearables
                    numericTraits
                }`
        },
        [ListingTypes.Aavegotchi]: {
            ercType: 'erc721Listings',
            category: '3',
            params: `
                id
                tokenId
                category
                blockCreated
                priceInWei
                seller
                timePurchased
                timeCreated
                portal {
                    hauntId
                    timesTraded
                    owner
                }
                parcel {
                    size
                    district
                    fomoBoost
                    fudBoost
                    kekBoost
                    alphaBoost
                    timesTraded
                    parcelId
                    parcelHash
                }
                gotchi {
                    id
                    name
                    collateral
                    modifiedNumericTraits
                    stakedAmount
                    hauntId
                    kinship
                    modifiedRarityScore
                    baseRarityScore
                    level
                    experience
                    owner {id}
                    equippedWearables
                    numericTraits
                }`
        },
        [ListingTypes.Wearable]: {
            ercType: getErcTypeFor1155Listing(selectedGoodsType),
            category: '0',
            params: getParamsForErc1155Listing(`
                erc1155TypeId
                category
                quantity
                timeLastPurchased
                timeCreated
                priceInWei
                seller
                `,
                `
                listingID
                buyer
                erc1155TypeId
                category
                quantity
                timeLastPurchased
                priceInWei
                seller
                `)
        },
        [ListingTypes.Consumable]: {
            ercType: getErcTypeFor1155Listing(selectedGoodsType),
            category: '2',
            params: getParamsForErc1155Listing(`
                erc1155TypeId
                category
                quantity
                timeLastPurchased
                timeCreated
                priceInWei
                seller
                `,
                `
                listingID
                buyer
                erc1155TypeId
                category
                quantity
                timeLastPurchased
                priceInWei
                seller
                `)
        },
        [ListingTypes.Tickets]: {
            ercType: getErcTypeFor1155Listing(selectedGoodsType),
            category: '3',
            params: getParamsForErc1155Listing(`
                erc1155TypeId
                category
                quantity
                timeLastPurchased
                timeCreated
                priceInWei
                seller
                `,
                `
                listingID
                buyer
                erc1155TypeId
                category
                quantity
                timeLastPurchased
                priceInWei
                seller
                `)
        },
        [ListingTypes.Realm]: {
            ercType: 'erc721Listings',
            category: '4',
            params: `
                id
                tokenId
                category
                blockCreated
                priceInWei
                seller
                timePurchased
                timeCreated
                portal {
                    hauntId
                    timesTraded
                    owner
                }
                parcel {
                    size
                    district
                    fomoBoost
                    fudBoost
                    kekBoost
                    alphaBoost
                    timesTraded
                    parcelId
                    parcelHash
                }
                gotchi {
                    id
                    name
                    collateral
                    modifiedNumericTraits
                    stakedAmount
                    hauntId
                    kinship
                    modifiedRarityScore
                    baseRarityScore
                    level
                    experience
                    owner {id}
                    equippedWearables
                    numericTraits
                }`
        }
    };

    return map[listingType];
};

const getWhereParams = (selectedGoodsType: any, listingType: any): any => {
    const getCorrectOrdering = (param: any, param1: any): any => {
        return [ListingTypes.Wearable,
            ListingTypes.Consumable,
            ListingTypes.Tickets
        ].indexOf(listingType) === -1 ? param : param1;
    };

    const map: any = {
        [ListingTypes.Activity]: [
            getCorrectOrdering('timePurchased_gt: 0', '')
        ],
        [ListingTypes.Listing]: [
            'seller: "0x0BcDc503f78BFf5Dc7B867C6740226d9621117b1"', 'cancelled: false', getCorrectOrdering('timePurchased: 0', 'sold: false')
        ],
        [ListingTypes.Sold]: [
            'seller: "0x0BcDc503f78BFf5Dc7B867C6740226d9621117b1"', getCorrectOrdering('timePurchased_gt: 0', '')
        ],
        [ListingTypes.Purchased]: [
            'buyer: "0x0BcDc503f78BFf5Dc7B867C6740226d9621117b1"', getCorrectOrdering('timePurchased_gt: 0', '')
        ]
    };

    return map[selectedGoodsType];
};

const getOrderParams = (selectedGoodsType: any, listingType: any): any => {
    const getCorrectOrdering = (orderBy: any): any => {
        return [ListingTypes.Wearable,
            ListingTypes.Consumable,
            ListingTypes.Tickets
        ].indexOf(listingType) === -1 ? orderBy : 'timeLastPurchased';
    };

    const map: any = {
        [ListingTypes.Activity]: [
            `orderBy: ${getCorrectOrdering('timePurchased')}`, 'orderDirection: desc'
        ],
        [ListingTypes.Listing]: [
            `orderBy: ${getCorrectOrdering('timeCreated')}`, 'orderDirection: desc'
        ],
        [ListingTypes.Sold]: [
            `orderBy: ${getCorrectOrdering('timeCreated')}`, 'orderDirection: desc'
        ],
        [ListingTypes.Purchased]: [
            `orderBy: ${getCorrectOrdering('timeCreated')}`, 'orderDirection: desc'
        ]
    };

    return map[selectedGoodsType];
};
