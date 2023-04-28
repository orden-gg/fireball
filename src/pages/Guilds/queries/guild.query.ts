const guildProps = `
  id
  name
  description
  logo
`;

export const guildsQuery = (): string => {
  return `
    guilds(first: 1000) {
      ${guildProps}
    }
  `;
};
