import { GraphQueryParams } from 'shared/models';

export const getBaazaarGotchiListingsQuery = (graphQueryParams: GraphQueryParams, whereParams: string) => {
    return `{
        erc721Listings (
            first: ${graphQueryParams.first}
            skip: ${graphQueryParams.skip}
            orderBy: ${graphQueryParams.orderBy}
            orderDirection: ${graphQueryParams.orderDirection}
            where: {
                cancelled: false
                timePurchased: "0"
                category: ${graphQueryParams.where.category}
                ${whereParams}
            }
        )
            {
                id
                priceInWei
                tokenId
                timeCreated
                hauntId
                gotchi {
                    id
                    owner {
                        id
                    }
                    hauntId
                    name
                    numericTraits
                    modifiedNumericTraits
                    withSetsNumericTraits
                    equippedWearables
                    collateral
                    kinship
                    experience
                    toNextLevel
                    level
                    baseRarityScore
                    modifiedRarityScore
                    withSetsRarityScore
                    possibleSets
                    equippedSetID
                    equippedSetName
                    usedSkillPoints
                    historicalPrices
                    timesTraded
                    stakedAmount
                }
            }
    }`;
};

export const getBaazaarParcelsListingsQuery = (graphQueryParams: GraphQueryParams, whereParams: string) => {
    return `{
        erc721Listings (
            first: ${graphQueryParams.first}
            skip: ${graphQueryParams.skip}
            orderBy: ${graphQueryParams.orderBy}
            orderDirection: ${graphQueryParams.orderDirection}
            where: {
                cancelled: false
                timePurchased: "0"
                category: ${graphQueryParams.where.category}
                ${whereParams}
            }
        )
            {
                id
                priceInWei
                parcel {
                    id
                    parcelId
                    parcelHash
                    coordinateX
                    coordinateY
                    district
                    fudBoost
                    fomoBoost
                    alphaBoost
                    kekBoost
                    size
                    timesTraded
                    historicalPrices
                    alchemica
                    surveys {
                        id
                        surveyed
                        round
                        fud
                        fomo
                        alpha
                        kek
                    }
                    installations {
                        id
                        installationId
                    }
                    tiles {
                        id
                        tileId
                    }
                }
            }
    }`;
};

export const getBaazaarClosedPortalsListingsQuery = (graphQueryParams: GraphQueryParams, whereParams: string) => {
    return `{
        erc721Listings (
            first: ${graphQueryParams.first}
            skip: ${graphQueryParams.skip}
            orderBy: ${graphQueryParams.orderBy}
            orderDirection: ${graphQueryParams.orderDirection}
            where: {
                cancelled: false
                timePurchased: "0"
                category: ${graphQueryParams.where.category}
                ${whereParams}
            }
        )
            {
                id
                priceInWei
                tokenId
              	category
                timeCreated
                hauntId
              	portal {
                    historicalPrices
                }
            }
    }`;
};

export const getBaazaarOpenedPortalsListingsQuery = () => {
    return `{
        erc721Listings (
            first: 500
            skip: 0
            orderBy: timeCreated
            orderDirection: asc
            where: {
                cancelled: false
                category: 2
                timePurchased: "0"
            })
            {
                id
                priceInWei
                tokenId
                timeCreated
                hauntId
                portal {
                    options {
                        id
                        numericTraits
                        collateralType
                        baseRarityScore
                    }
                }
            }
    }`;
};

export const getBaazaarErc1155ListingsQuery = (graphQueryParams: GraphQueryParams, whereParams: string) => {
    return `{
        erc1155Listings (
            first: ${graphQueryParams.first}
            skip: ${graphQueryParams.skip}
            orderBy: ${graphQueryParams.orderBy}
            orderDirection: ${graphQueryParams.orderDirection}
            where: {
                category: ${graphQueryParams.where.category}
                cancelled: false
                sold: false
                ${whereParams}
            })
            {
                id
                priceInWei
                category
                timeCreated
                quantity
                rarityLevel
                erc1155TypeId
            }
    }`;
};

export const getBaazaarActivityPortalsListingsQuery = (graphQueryParams: GraphQueryParams, whereParams: string) => {
    return `{
        erc721Listings (
            first: 100
            orderBy: timePurchased
            orderDirection: desc
            where: {
                timePurchased_gt: 0
                category_in: [${graphQueryParams.where.categories?.map((category: string) => `${category}`)}]
                ${whereParams}
            }
        )
            {
                id
                tokenId
                hauntId
                category
                priceInWei
                buyer
                seller
                timePurchased
                portal {
                    historicalPrices
                }
            }
    }`;
};

export const getBaazaarActivityGotchisListingsQuery = (graphQueryParams: GraphQueryParams, whereParams: string) => {
    return `{
        erc721Listings (
            first: 100
            orderBy: timePurchased
            orderDirection: desc
            where: {
                timePurchased_gt: 0
                category_in: [${graphQueryParams.where.categories?.map((category: string) => `${category}`)}]
                ${whereParams}
            }
        )
            {
                id
                tokenId
                category
                priceInWei
                seller
                buyer
                timePurchased
                equippedWearables
                nrgTrait
                aggTrait
                spkTrait
                brnTrait
                eysTrait
                eycTrait
                gotchi {
                    id
                    owner {
                        id
                    }
                    hauntId
                    name
                    numericTraits
                    modifiedNumericTraits
                    withSetsNumericTraits
                    equippedWearables
                    collateral
                    kinship
                    experience
                    toNextLevel
                    level
                    baseRarityScore
                    modifiedRarityScore
                    withSetsRarityScore
                    possibleSets
                    equippedSetID
                    equippedSetName
                    usedSkillPoints
                    historicalPrices
                    timesTraded
                    stakedAmount
                }
            }
    }`;
};

export const getBaazaarActivityParcelsListingsQuery = (graphQueryParams: GraphQueryParams, whereParams: string) => {
    return `{
        erc721Listings (
            first: 100
            orderBy: timePurchased
            orderDirection: desc
            where: {
                timePurchased_gt: 0
                category_in: [${graphQueryParams.where.categories?.map((category: string) => `${category}`)}]
                ${whereParams}
            }
        )
            {
                id
                priceInWei
                seller
                buyer
                timePurchased
                parcel {
                    id
                    parcelId
                    parcelHash
                    coordinateX
                    coordinateY
                    district
                    fudBoost
                    fomoBoost
                    alphaBoost
                    kekBoost
                    size
                    timesTraded
                    historicalPrices
                    alchemica
                    surveys {
                        id
                        surveyed
                        round
                        fud
                        fomo
                        alpha
                        kek
                    }
                }
            }
    }`;
};

export const getBaazaarErc1155PurchasesQuery = (graphQueryParams: GraphQueryParams, whereParams: string = '') => {
    return `{
        erc1155Purchases (
            first: 100
            orderBy: timeLastPurchased
            orderDirection: desc
            where: {
                category: ${graphQueryParams.where.category}
                ${whereParams}
            })
            {
                listingID
                erc1155TypeId
                category
                priceInWei
                quantity
                timeLastPurchased
                seller
                buyer
                rarityLevel
            }
    }`;
};
