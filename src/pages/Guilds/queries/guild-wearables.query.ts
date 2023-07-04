export const wearablesByAddressesQuery = (first: number, skip: number, playersAddresses: string[]): string => {
  return `{
    erc1155Items(
      first: ${first}
      skip: ${skip}
      where: {
        category: 0
        owner_in: [${playersAddresses.map((address) => `"${address}"`)}]
      }
    )
    {
      tokenId
      amount
      category
      equipped
    }
  }`;
};
