const items: string = `
  items {
    equipped
    amount
    tokenId
  }
`;

const identity: string = `
  identity {
    claimed {
      gotchiId
    }
    unclaimed {
      gotchiId
    }
  }
`;

export const gotchiIdentityQuery = (id: number): string => {
  return `{
    gotchi(id: ${id}) {
      ${identity}
  }`;
};

export const gotchiQuery = (id: number): string => {
  return `{
    gotchi(id: ${id}) {
      id
      badges
      ${identity}
      name
      numericTraits
      modifiedNumericTraits
      withSetsNumericTraits
      baseRarityScore
      modifiedRarityScore
      withSetsRarityScore
      kinship
      toNextLevel
      level
      experience
      equippedWearables
      collateral
      hauntId
      createdAt
      possibleSets
      equippedSetID
      equippedSetName
      usedSkillPoints
      minimumStake
      stakedAmount
      timesTraded
      originalOwner
      listings(where:{cancelled: false, timePurchased: 0}) {
          id
          priceInWei
      }
      historicalPrices
      owner {
          id
      }
      originalOwner {
          id
      }
      lending
    }
  }`;
};

export const playerInventoryQuery = (address: string): string => {
  return `{
    player(id: "${address}") {
      ${items}
    }
  }`;
};
