export const getForgeItemsByAddressQuery = (address: string): string => {
  return `{
    forgeItems(where: { owner: "${address}", amount_gt: 0 }) {
      id
      tokenId
      amount
      category
      rarity
      slot
    }
  }`;
};
