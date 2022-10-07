import { GraphQueryParams } from 'shared/models';

export const getBaazaarGotchiListingsQuery = (graphQueryParams: GraphQueryParams, whereParams: string) => {
    return `{
        erc721Listings (
            first: ${graphQueryParams.first},
            skip: ${graphQueryParams.skip},
            orderBy: ${graphQueryParams.orderBy},
            orderDirection: ${graphQueryParams.orderDirection},
            where: {
                cancelled: false,
                timePurchased: "0"
                category: ${graphQueryParams.where.category},
                ${whereParams}
            }
        )
            {
                id,
                priceInWei,
                tokenId,
                timeCreated,
                hauntId,
                gotchi {
                    id,
                    owner {
                        id
                    },
                    hauntId,
                    name,
                    numericTraits,
                    modifiedNumericTraits
                    withSetsNumericTraits,
                    equippedWearables,
                    collateral,
                    kinship,
                    experience,
                    toNextLevel,
                    level,
                    baseRarityScore,
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


export const getBaazaarClosedPortalsListingsQuery = (graphQueryParams: GraphQueryParams, whereParams: string) => {
    return `{
        erc721Listings (
            first: ${graphQueryParams.first},
            skip: ${graphQueryParams.skip},
            orderBy: ${graphQueryParams.orderBy},
            orderDirection: ${graphQueryParams.orderDirection},
            where: {
                cancelled: false,
                timePurchased: "0"
                category: ${graphQueryParams.where.category},
                ${whereParams}
            }
        )
            {
                id,
                priceInWei,
                tokenId,
              	category
                timeCreated,
                hauntId,
              	portal {
                  historicalPrices
                }
            }
    }`;
};
