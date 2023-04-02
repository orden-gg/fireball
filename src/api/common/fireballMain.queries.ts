const items: string = `
  equipped
  amount
  tokenId
`;

const identity: string = `
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
  lending
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

export const gotchiBatchQuery = (id: number): string => {
  return `
    gotchi${id}: gotchi(id: ${id}) {
      ${gotchi}
    }
  `;
};
