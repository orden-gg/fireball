export const getMemberByIdQuery = (address: string): string => {
  return `{
    members(
      where: {
        id: "${address}"
      }
    ) {
      guild {
        id
      }
    }
  }`;
};
