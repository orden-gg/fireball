export const gotchiBatchQuery = (id: number): string => {
  return `
    gotchi${id}: gotchi(id: ${id}) {
      availableSkillPoints
      badges
      lending
      identity {
        shape
        color
        collateral
        claimed {
          gotchiId
        }
        unclaimed {
          gotchiId
        }
      }
    }
  `;
};
