const memberBestGotchi = `
  id
  baseRarityScore
  modifiedRarityScore
  name
`;

const guildGotchiQuery = `
  ${memberBestGotchi}
  numericTraits
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

export const guildMemberBestGotchiQuery = (addresses: string[]): string => {
  return `{
    users(where: { id_in: ${JSON.stringify(addresses)} }) {
      id
      gotchisOriginalOwned(
        first:1,
        orderBy:modifiedRarityScore, 
        orderDirection:desc
      ) {
        ${memberBestGotchi}
      }
    }
  }`;
};
