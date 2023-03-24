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
  identity {
    ${identity}
  }
`;
// Will be used shortly
export const playerGotchisQuery = (address: string, skip: number): string => {
  return `{
    player(id: "${address}") {
      id
      gotchisOriginalOwned(
        first: 1000
        skip: ${skip}
      ) {
        ${gotchi}
      }
    }
  }`;
};

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
