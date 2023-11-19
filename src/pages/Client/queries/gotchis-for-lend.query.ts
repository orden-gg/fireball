export const getGotchisForLendByAddressQuery = (address: string) => {
  return `{
    aavegotchis(
      first: 1000,
      where:{
        lending: null,
        activeListing: null,
        owner: "${address.toLowerCase()}"
      }
    ) {
      id
      name
      collateral
      kinship
      level
      hauntId
      escrow
    }
  }`;
};
