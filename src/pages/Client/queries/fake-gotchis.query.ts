import { Erc721Categories } from 'shared/constants';

export const getFakeGotchisByAddressQuery = (address: string) => {
  return `{
        account(id: "${address}") {
            id
            ERC721tokens(first: 1000) {
                identifier
                name
                artistName
                description
                editions
                thumbnailHash
                externalLink
                metadata {
                    editions
                    createdAt
                    likeCount
                    status
                }
            }
            ERC1155balances(first: 1) {
                id
                valueExact
            }
        }
    }`;
};

export const getFakeGotchisListingsQuery = (id: number): string => {
  return `
        item${id}: erc721Listings(
            where: {
                category: ${Erc721Categories.FakeAavegotchi}
                tokenId_in: [${id}]
                cancelled: false
            }
        ) {
            id
            priceInWei
            timePurchased
        }
    `;
};

export const getFakeGotchiCardCurrentListingQuery = (): string => {
  return `{
        erc1155Listings(
            first: 1
            where: {
                category: 6
                cancelled: false
                timeLastPurchased: 0
            }
            orderBy: priceInWei
            orderDirection: asc
        )
        {
            id
            priceInWei
        }
    }`;
};

export const getFakeGotchiCardLastSoldListingQuery = (): string => {
  return `{
        erc1155Listings (
            first: 1
            where: {
                cancelled: false
                sold: false
                category: 6
            }
            orderBy: timeLastPurchased
            orderDirection: desc
        ){
            id
            priceInWei
            timeLastPurchased
        }
    }`;
};
