const items: string = `
  equipped
  amount
  tokenId
`;

const identity: string = `
  shape
  color
  collateral
  claimed {
    gotchiId
  }
  unclaimed {
    gotchiId
  }
`;

const gotchi: string = `
  availableSkillPoints
  badges
  identity {
    ${identity}
  }
`;

export const gotchiQuery = (id: number): string => {
  return `{
    gotchi(id: ${id}) {
      ${gotchi}
    }
  }`;
};

export const playerInventoryQuery = (address: string): string => {
  return `{
    player(id: "${address}") {
      items {
        ${items}
      }
    }
  }`;
};
