const guildProps = `
  id
  safeAddress
  owner
  name
  description
  logo
  membersCount
  members {
    id
  }
`;

export const guildsQuery = (): string => {
  return `{
    guilds {
      ${guildProps}
    }
  }`;
};

export const guildByIdQuery = (id: string): string => {
  return `{
    guilds(
      where: {
        safeAddress: "${id}"
      }
    ) {
      ${guildProps}
    }
  }`;
};

export const guildPlayersStatsQuery = (playersAddresses: string[]): string => {
  return `{
    players (where: {
      id_in: [${playersAddresses.map((address) => `"${address}"`)}]
    }) {
      id
      gotchisVP
      itemsVP
      portalsVP
      portalsAmount
      gotchisOriginalOwnedAmount
      itemsAmount
    }
  }`;
};

export const guildPlayersStatsRealmQuery = (playersAddresses: string[]): string => {
  return `{
    players (where: {
      id_in: [${playersAddresses.map((address) => `"${address}"`)}]
    }) {
      id
      parcelsCount
      installationsCount
      tilesCount
      parcelsVP
    }
  }`;
};
