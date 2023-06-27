export const channelingByAddressesQuery = (first: number, skip: number, playersAddresses: string[]): string => {
  return `{
    channelAlchemicaEvents(
      first: ${first}
      skip: ${skip}
      orderBy: timestamp,
      orderDirection: desc,
      where: {
        parcel_: {
          owner_in: [${playersAddresses.map((address) => `"${address}"`)}]
        }
      }
    ) {
      timestamp
      gotchiId
      realmId
      parcel {
        owner
        equippedInstallations (
          where: {
            installationType: 0
          })
        {
          level
        }
      }
      alchemica
      transaction
    }
  }`;
};
