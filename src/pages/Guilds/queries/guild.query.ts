const guildProps = `
  id
  name
  description
  logo
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
        id: "${id}"
      }
    ) {
      ${guildProps}
    }
  }`;
};
