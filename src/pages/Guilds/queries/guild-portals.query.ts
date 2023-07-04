export const portalsByAddressesQuery = (first: number, skip: number, playersAddresses: string[]): string => {
  return `{
    portals(
      first: ${first}
      skip: ${skip}
      where: {
        owner_in: [${playersAddresses.map((address) => `"${address}"`)}]
      }
    ) {
      openedAt
      hauntId
      id
    }
  }`;
};
