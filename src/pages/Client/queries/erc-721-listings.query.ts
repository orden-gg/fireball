import { Erc721Categories } from 'shared/constants';

export const getErc721ListingsByCategoriesQuery = (id: number, categories: Erc721Categories[]): string => {
  return `
    item${id}: erc721Listings(
      where: {
        category_in: [${categories}]
        tokenId_in: [${id}]
        cancelled: false
        timePurchased: 0
      }
      orderBy: timePurchased
      orderDirection: desc
    ) {
      id
      priceInWei
      timePurchased
    }
  `;
};
