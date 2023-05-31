export const realmByAddressesQuery = (first: number, skip: number, playersAddresses: string[]): string => {
  return `{
    parcels(
      first: ${first},
      skip: ${skip}
      where: {
        owner_in: [${playersAddresses.map((address) => `"${address}"`)}]
      }
    ) {
      id
      parcelId
      coordinateX
      coordinateY
      size
      district
      parcelHash
      owner {
        id
      }
    }
  }`;
};
