const guildGotchiQuery = `
  id
  name
  numericTraits
  baseRarityScore
  modifiedRarityScore
  collateral
  hauntId
  usedSkillPoints
  equippedWearables
  owner {
    id
  }
`;

export const guildGotchisQuery = (address: string, skip: number): string => {
  return `{
    aavegotchis(
      first: 1000
      skip: ${skip}, 
      where: { originalOwner: "${address}" }
    ) {
      ${guildGotchiQuery}
    }
  }`;
};
