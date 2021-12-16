import { listingTypes } from "../../data/types";

export const getQueries = (selectedGoodsType, listingType) => {

    const getQuery = (params, selectedGoodsType, listingType) => {
        return `{
            ${params.ercType}(
                first: 500,
                where: {
                    category: ${params.category},
                    ${getWhereParams(selectedGoodsType, listingType).map((item) => {
                return item + ','
            })}
                },
                ${getOrderParams(selectedGoodsType, listingType).map((item) => {
                return item + ','
            })}
            ) {
                __typename
                ${params.params}
            }
        }`
    };

    let queries = [];
    let params;

    if (listingType === listingTypes.all) {
        [
            listingTypes.closedPortal,
            listingTypes.openedPortal,
            listingTypes.aavegotchi,
            listingTypes.wearable,
            listingTypes.consumable,
            listingTypes.tickets,
            listingTypes.realm
        ].map((item) => {
            params = getParamsForSelectedType(selectedGoodsType, item);
            queries.push(getQuery(params, selectedGoodsType, item));
        });
    } else {
        params = getParamsForSelectedType(selectedGoodsType, listingType);
        queries.push(getQuery(params, selectedGoodsType, listingType));
    }

    return queries;
};

const getParamsForSelectedType = (selectedGoodsType, listingType) => {
    const getErcTypeFor1155Listing = (selectedGoodsType) => {
        return [listingTypes.activity,
            listingTypes.sold,
            listingTypes.purchased
        ].indexOf(selectedGoodsType) === -1 ? 'erc1155Listings' : 'erc1155Purchases';
    };

    const getParamsForErc1155Listing = (params, params2) => {
        return [listingTypes.activity,
            listingTypes.sold,
            listingTypes.purchased
        ].indexOf(selectedGoodsType) === -1 ? params : params2;
    };

    const map = {
        [listingTypes.closedPortal]: {
            ercType: 'erc721Listings',
            category: "0",
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
        [listingTypes.openedPortal]: {
            ercType: 'erc721Listings',
            category: "2",
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
        [listingTypes.aavegotchi]: {
            ercType: 'erc721Listings',
            category: "3",
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
        [listingTypes.wearable]: {
            ercType: getErcTypeFor1155Listing(selectedGoodsType),
            category: "0",
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
        [listingTypes.consumable]: {
            ercType: getErcTypeFor1155Listing(selectedGoodsType),
            category: "2",
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
        [listingTypes.tickets]: {
            ercType: getErcTypeFor1155Listing(selectedGoodsType),
            category: "3",
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
        [listingTypes.realm]: {
            ercType: 'erc721Listings',
            category: "4",
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

const getWhereParams = (selectedGoodsType, listingType) => {
    const getCorrectOrdering = (param, param1) => {
        return [listingTypes.wearable,
            listingTypes.consumable,
            listingTypes.tickets
        ].indexOf(listingType) === -1 ? param : param1;
    };

    const map = {
        [listingTypes.activity]: [
            getCorrectOrdering('timePurchased_gt: 0', '')
        ],
        [listingTypes.listing]: [
            'seller: "0x0BcDc503f78BFf5Dc7B867C6740226d9621117b1"', 'cancelled: false', getCorrectOrdering('timePurchased: 0', 'sold: false')
        ],
        [listingTypes.sold]: [
            'seller: "0x0BcDc503f78BFf5Dc7B867C6740226d9621117b1"', getCorrectOrdering('timePurchased_gt: 0', '')
        ],
        [listingTypes.purchased]: [
            'buyer: "0x0BcDc503f78BFf5Dc7B867C6740226d9621117b1"', getCorrectOrdering('timePurchased_gt: 0', '')
        ]
    };

    return map[selectedGoodsType];
};

const getOrderParams = (selectedGoodsType, listingType) => {
    const getCorrectOrdering = (orderBy) => {
        return [listingTypes.wearable,
            listingTypes.consumable,
            listingTypes.tickets
        ].indexOf(listingType) === -1 ? orderBy : 'timeLastPurchased';
    };

    const map = {
        [listingTypes.activity]: [
            `orderBy: ${getCorrectOrdering('timePurchased')}`, 'orderDirection: desc'
        ],
        [listingTypes.listing]: [
            `orderBy: ${getCorrectOrdering('timeCreated')}`, 'orderDirection: desc'
        ],
        [listingTypes.sold]: [
            `orderBy: ${getCorrectOrdering('timeCreated')}`, 'orderDirection: desc'
        ],
        [listingTypes.purchased]: [
            `orderBy: ${getCorrectOrdering('timeCreated')}`, 'orderDirection: desc'
        ]
    };

    return map[selectedGoodsType];
};