export const getQueuedFakeGotchisQuery = (): string => {
    return `{
        metadataActionLogs(
            where: {
                status_lt: 2
            }
            orderBy: timestamp
            orderDirection: asc
        ) {
            artistName
            name
            description
            thumbnailHash
            editions
        }
    }`;
};
