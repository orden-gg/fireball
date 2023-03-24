export const gotchiBatchQuery = (id: number): string => {
  return `
    gotchi${id}: gotchi(id: ${id}) {
      availableSkillPoints
      badges
      identity {
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
