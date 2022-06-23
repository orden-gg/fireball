export const raffleTicketPriceQuery = (id: string): string => {
    return `{
        erc1155Listings (
            first: 5,
            orderBy: timeLastPurchased,
            orderDirection: desc,
            where: {
                cancelled: false,
                sold: true,
                category: 3,
                erc1155TypeId: ${id}
            }
        ){
            id,
            priceInWei
        }
    }`;
};

// TODO check if needed
export const rafflePortalsPriceQuery = (): string => {
    return `{
        erc721Listings (
            first: 15,
            orderBy: priceInWei,
            orderDirection: asc,
            where: {
                cancelled: false,
                category: 0,
                timePurchased: 0,
                hauntId: 2
            }
        ){
            id
            priceInWei
        }
    }`;
};

// TODO check if needed
export const raffleTotalQuery = (id: string): string => {
    return `{
        total(id: ${id}) {
            totalCommon
            totalUncommon
            totalRare
            totalLegendary
            totalMythical
            totalLegendary
            totalGodLike
            totalDrop
        }
    }`;
};

// TODO check if needed
export const raffle5TotalEnteredQuery = (): string => {
    return `{
        total(id: 4) {
            totalDrop
        }
    }`;
};

// TODO check if needed
export const raffle6TotalEnteredQuery = (): string => {
    return `{
        total(id: 5) {
            totalCommon
            totalUncommon
            totalRare
            totalLegendary
            totalMythical
            totalLegendary
            totalGodLike
        }
    }`;
};
