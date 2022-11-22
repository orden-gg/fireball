export const getFakeGotchisByAddressQuery = (address: string) => {
    return `{
        account(id: "${address}") {
            id
            ERC721tokens(first: 1000) {
                identifier
                metadata {
                    name
                    thumbnailHash
                    description
                }
            }
            ERC1155balances(first: 1) {
                id
                valueExact
            }
        }
    }`;
};
