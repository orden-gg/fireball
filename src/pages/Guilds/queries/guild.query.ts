const guildProps = `
  id
  safeAddress
  name
  description
  logo
`;

export const guildsQuery = (): string => {
  return `{
    guilds {
      ${guildProps}
      members {
        id
      }
      membersCount
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
