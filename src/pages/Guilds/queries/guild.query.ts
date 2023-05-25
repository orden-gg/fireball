const guildProps = `
  id
  safeAddress
  owner
  name
  description
  logo
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
      gotchisVP
      itemsVP
      portalsVP
      portalsAmount
      gotchisOriginalOwnedAmount
      itemsAmount
    }
  }`;
};
