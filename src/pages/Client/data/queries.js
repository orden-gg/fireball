export const ownedGotchiesQuery = (user) => {
    return `{
        user(id: "${user.toLowerCase()}") {
            gotchisOwned{
                id
                name
                numericTraits
                baseRarityScore
                kinship
                experience
                equippedWearables
            }
        }
    }`
};