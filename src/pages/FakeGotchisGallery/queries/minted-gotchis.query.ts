export const getMintedFakeGotchisQuery = (): string => {
    return `{
        metadataActionLogs(
            where:{
                status: 2
            }
            orderBy: timestamp
            orderDirection: desc
        ) {
            artistName
            name
            description
            thumbnailHash
            editions
            externalLink
            createdAt
            likeCount
            status
        }
    }`;
};
