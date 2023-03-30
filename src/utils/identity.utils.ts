// Will be deleted as soon as thegraph updated
import { TheGraphApi } from 'api';
import { ClientApi } from 'pages/Client/api';

import { TraitsNumberTypes } from 'shared/constants';
import { CollateralData, GotchiExtended, Identity } from 'shared/models';

import { collaterals } from 'data/collaterals.data';

const opositeHauntCollaterals: { [key: string]: string } = {
  maDAI: '0x27f8d03b3a2196956ed754badc28d73be8830a6e',
  amDAI: '0xe0b22e0037b130a9f56bbb537684e6fa18192341',
  maAAVE: '0x1d2a0e5ec8e5bbdca5cb219e649b565d8e5c3360',
  amAAVE: '0x823cd4264c1b951c9209ad0deaea9988fe8429bf',
  maUSDT: '0x60d55f02a771d515e077c9c2403a1ef324885cec',
  amUSDT: '0xdae5f1590db13e3b40423b5b5c5fbf175515910b',
  amUSDC: '0x9719d867a500ef117cc201206b8ab51e794d3f82',
  maUSDC: '0x1a13f4ca1d028320a707d99520abfefca3998b7f'
};

export class IdentityUtils {
  public static getSameIdentityContract(contractAddress: string): string | null {
    const currentCollateral: CollateralData | undefined = collaterals.find(
      (collateral: CollateralData) => collateral.address === contractAddress
    );

    if (currentCollateral?.name) {
      return opositeHauntCollaterals[currentCollateral.name] || null;
    } else {
      return null;
    }
  }

  public static getSameIdentityId(identity: Identity, collateral: string): string {
    return `${collateral}, ${identity.shape}, ${identity.color}`;
  }

  public static isMithLowGotchi(traits: number[]): boolean {
    return traits[TraitsNumberTypes.EYS] === 0 || traits[TraitsNumberTypes.EYS] === 1;
  }

  public static async getUpdatedIdentity(gotchi: GotchiExtended): Promise<GotchiExtended> {
    const collateral: string | null = IdentityUtils.getSameIdentityContract(gotchi.collateral);
    const isMythLow: boolean =
      gotchi.numericTraits[TraitsNumberTypes.EYS] === 0 || gotchi.numericTraits[TraitsNumberTypes.EYS] === 1;

    if (collateral && !isMythLow) {
      const identityId: string = IdentityUtils.getSameIdentityId(gotchi.identity, collateral);

      return await TheGraphApi.getFireballIdentityById(identityId).then((identity: Identity) => {
        gotchi.identity.claimed = [...gotchi.identity.claimed, ...identity.claimed];
        gotchi.identity.unclaimed = [...gotchi.identity.unclaimed, ...identity.unclaimed];

        return gotchi;
      });
    } else {
      return gotchi;
    }
  }

  public static async getUpdatedIdentities(gotchis: CustomAny[]): Promise<CustomAny[]> {
    const identitiesIds: CustomAny[] = gotchis
      .map((extendedGotchi: GotchiExtended) => {
        const collateral: string | null = IdentityUtils.getSameIdentityContract(extendedGotchi.collateral);
        const isMythLow: boolean = IdentityUtils.isMithLowGotchi(extendedGotchi.numericTraits);

        if (collateral && !isMythLow) {
          return {
            gotchiId: extendedGotchi.id,
            id: IdentityUtils.getSameIdentityId(extendedGotchi.identity, collateral)
          };
        } else {
          return null;
        }
      })
      .filter((identity: CustomAny) => identity !== null) as CustomAny[];

    return await ClientApi.getFireballIdentityByIds(identitiesIds).then((identities: Identity[]) => {
      gotchis.forEach((gotchiExtended: GotchiExtended) => {
        const identity: CustomAny = identities[`gotchi${gotchiExtended.id}`];

        if (identity) {
          gotchiExtended.identity.claimed = [...gotchiExtended.identity.claimed, ...identity.claimed];
          gotchiExtended.identity.unclaimed = [...gotchiExtended.identity.unclaimed, ...identity.unclaimed];
        }
      });

      return gotchis;
    });
  }
}
