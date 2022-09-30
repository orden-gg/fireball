import { GraphQueryParams } from '../store';

export const getBaazaarGotchiListingsQuery = (graphQueryParams: GraphQueryParams, whereParams: string) => {
    return `{
        erc721Listings (
            first: ${graphQueryParams.first},
            skip: ${graphQueryParams.skip},
            orderBy: ${graphQueryParams.orderBy},
            orderDirection: ${graphQueryParams.orderDirection},
            where: {
                cancelled: false,
                category: ${graphQueryParams.where.category},
                timePurchased: "0"
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
