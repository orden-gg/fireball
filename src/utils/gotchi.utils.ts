import { EthersApi } from 'api';

import { GotchiTypes, ONE_MILLION, RarityTypes } from 'shared/constants';
import { CollateralData, Gotchi, GotchiAgingModel, GotchiInventory } from 'shared/models';

import { collaterals } from 'data/collaterals.data';

export class GotchiUtils {
  public static getTotalXpByLevel(level: number): number {
    return (level * level) / 0.02; // Based on https://wiki.aavegotchi.com/en/xp
  }

  public static getLevelXpByLevel(level: number): number {
    const [currentXp, previousXp]: number[] = [
      GotchiUtils.getTotalXpByLevel(level),
      GotchiUtils.getTotalXpByLevel(level - 1)
    ];

    return currentXp - previousXp;
  }

  public static getGotchiLevelPercentage(level: number, toNextLevel: number): number {
    const diff: number = GotchiUtils.getLevelXpByLevel(level);
    const percentageFormula: number = 100 - Math.floor((Number(toNextLevel) * 100) / diff);

    return percentageFormula;
  }

  public static getRarityByTrait(trait: CustomAny): CustomAny {
    if (trait >= 100 || trait <= -1) {
      return RarityTypes.Godlike;
    } else if (trait >= 98 || trait <= 1) {
      return RarityTypes.Mythical;
    } else if (trait >= 90 || trait <= 9) {
      return RarityTypes.Rare;
    } else if (trait >= 75 || trait <= 24) {
      return RarityTypes.Uncommon;
    } else if (trait >= 25 && trait <= 74) {
      return RarityTypes.Common;
    } else {
      return RarityTypes.Unknown;
    }
  }

  public static getAgingMetadata(blocksOld: number): GotchiAgingModel {
    switch (true) {
      case blocksOld > 89 * ONE_MILLION:
        return { name: 'Aancient', boost: 10 };
      case blocksOld > 55 * ONE_MILLION:
        return { name: 'Aancient', boost: 9 };
      case blocksOld > 35 * ONE_MILLION:
        return { name: 'Aancient', boost: 8 };
      case blocksOld > 21 * ONE_MILLION:
        return { name: 'Aancient', boost: 7 };
      case blocksOld > 13 * ONE_MILLION:
        return { name: 'Aancient', boost: 6 };
      case blocksOld > 8 * ONE_MILLION:
        return { name: 'Boomer', boost: 5 };
      case blocksOld > 5 * ONE_MILLION:
        return { name: 'Zoomer', boost: 4 };
      case blocksOld > 3 * ONE_MILLION:
        return { name: 'Youngin', boost: 3 };
      case blocksOld > 2 * ONE_MILLION:
        return { name: 'Youngin', boost: 2 };
      case blocksOld > 1 * ONE_MILLION:
        return { name: 'Newborn', boost: 1 };
      default:
        return { name: 'Newborn', boost: 0 };
    }
  }

  public static getAgingImg(id: number): CustomAny {
    try {
      return require(`../assets/images/aging/${id}.png`).default;
    } catch (error) {
      return require('../assets/images/image-placeholder.svg').default;
    }
  }

  public static getStakedAmount(collateralAddress: string, stakedAmount: number): number {
    const collateral: Undefinable<CollateralData> = collaterals.find(
      (collateral: CollateralData) => collateral.address === collateralAddress
    );

    return EthersApi.fromWei(stakedAmount, collateral?.decimals);
  }

  public static convertDataFromContract(gotchi: CustomAny[]): Gotchi {
    const inventory: GotchiInventory[] = gotchi[GotchiTypes.Inventory].map((item: CustomAny) => {
      return {
        id: EthersApi.formatBigNumber(item.itemId),
        balance: EthersApi.formatBigNumber(item.balance)
      };
    });

    return {
      id: EthersApi.formatBigNumber(gotchi[GotchiTypes.Id]),
      name: gotchi[GotchiTypes.Name],
      numericTraits: gotchi[GotchiTypes.NumericTraits],
      modifiedNumericTraits: gotchi[GotchiTypes.ModifiedNumericTraits],
      equippedWearables: gotchi[GotchiTypes.EquippedWearables],
      collateral: gotchi[GotchiTypes.Collateral],
      owner: {
        id: gotchi[GotchiTypes.Owner]
      },
      stakedAmount: gotchi[GotchiTypes.StakedAmount],
      minimumStake: EthersApi.formatBigNumber(gotchi[GotchiTypes.MinimumStake]),
      kinship: EthersApi.formatBigNumber(gotchi[GotchiTypes.Kinship]),
      experience: EthersApi.formatBigNumber(gotchi[GotchiTypes.Experience]),
      toNextLevel: EthersApi.formatBigNumber(gotchi[GotchiTypes.ToNextLevel]),
      usedSkillPoints: EthersApi.formatBigNumber(gotchi[GotchiTypes.UsedSkillPoints]),
      level: EthersApi.formatBigNumber(gotchi[GotchiTypes.Level]),
      hauntId: EthersApi.formatBigNumber(gotchi[GotchiTypes.HauntId]),
      baseRarityScore: gotchi[GotchiTypes.BaseRarityScore],
      modifiedRarityScore: gotchi[GotchiTypes.ModifiedRarityScore],
      inventory: inventory
    };
  }
}
