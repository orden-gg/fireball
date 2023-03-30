export const gotchiBatchQuery = (id: number): string => {
  return `
    gotchi${id}: gotchi(id: ${id}) {
      availableSkillPoints
      badges
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

// TODO: Will be deleted as soon as thegraph updated
export const identitiesQuery = (identity: CustomAny): string => {
  return `
    gotchi${identity.gotchiId}: identity(id: "${identity.id}") {
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
  `;
};
