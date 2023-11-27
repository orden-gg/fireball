export const batchLendInitialValues = {
  initialCost: 0,
  period: 1 * 60 * 60,
  revenueSplit: [65, 15, 20] as [number, number, number],
  thirdParty: '0x1840248b0c642b9E317F7451FCafc04aA9275550',
  whitelistId: 717,
  revenueTokens: [
    '0x403E967b044d4Be25170310157cB1A4Bf10bdD0f',
    '0x44A6e0BE76e1D9620A7F76588e4509fE4fa8E8C8',
    '0x6a3E7C3c6EF65Ee26975b12293cA1AAD7e1dAeD2',
    '0x42E5E06EF5b90Fe15F853F59299Fc96259209c5C'
  ] as [string, string, string, string],
  permissions: 0
} as const;
