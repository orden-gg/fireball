export const gotchiesQuery = (skip, orderDir) => {
    return `{
        aavegotchis(
          first: 1000,
          skip: ${skip},
          orderBy: id,
          orderDirection: ${orderDir},
          where: {status: 3}
        ) {
          id
          name
          numericTraits
          baseRarityScore
          modifiedRarityScore
          withSetsRarityScore
          kinship
          experience
          equippedWearables
          owner {
            id
          }
        }
    }`
};

export const userQuery = (id) => {
    return `{
        user(id: "${id}") {
          id
          gotchisOwned(where: {status: 3}) {
            id
            name
            numericTraits
            baseRarityScore
            modifiedRarityScore
            withSetsRarityScore
            kinship
            experience
            equippedWearables
            owner {
              id
            }
          }
        }
    }`
};