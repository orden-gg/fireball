import { Erc721Categories } from 'shared/constants';

export const getFakeGotchisByAddressQuery = (address: string) => {
    return `{
        account(id: "${address}") {
            id
            ERC721tokens(first: 1000) {
                identifier
                name
                artistName
                publisherName
                description
                editions
                thumbnailHash
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
