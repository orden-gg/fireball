const guildProps = `
  id
  safeAddress
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
