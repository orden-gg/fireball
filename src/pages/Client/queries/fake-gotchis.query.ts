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

export const getFakeGotchiCardCurrentListingQuery = (seller: string): string => {
    return `{
        erc1155Listings(
            where: {
                seller: "${seller}",
                cancelled: false,
                timeLastPurchased: 0
            }
        )
        {
            id
            priceInWei
        }
    }`;
};

export const getFakeGotchiCardLastSoldListingQuery = (): string => {
    return `{
        erc1155Listings(
            first: 1
            where: {
                erc1155TypeId: 0
                priceInWei_lt: "10000000000000000000000000"
                quantity_gt: 0
                cancelled: false
            }
            orderBy: timeLastPurchased
            orderDirection: desc
        ) {
            id
            priceInWei
            timeCreated
            timeLastPurchased
        }
    }`;
};
