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
