const guildProps = `
  id
  name
  description
  logo
`;

export const guildsQuery = (): string => {
  return `
    guilds {
      ${guildProps}
    }
  `;
};
