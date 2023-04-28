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

const lentBorrowedGotchiQuery = `
  id
  timeAgreed
  period
  gotchi {
    ${guildGotchiQuery}
  }
  lender
  borrower
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

export const borrowedByAddressQuery = (address: string, skip: number): string => {
  return `{
    gotchiLendings(
      first: 1000,
      skip: ${skip},
      where:{
        borrower: "${address}",
        cancelled: false,
        completed: false
      }
    ) {
      ${lentBorrowedGotchiQuery}
    }
  }`;
};

export const lentByAddressQuery = (address: string, skip: number): string => {
  return `{
    gotchiLendings(
      first: 1000,
      skip: ${skip},
      where:{
        lender: "${address}",
        borrower_not: "0x0000000000000000000000000000000000000000",
        cancelled: false,
        completed: false
      }
    ) {
      ${lentBorrowedGotchiQuery}
    }
  }`;
};
