import { EthersApi } from 'api';

import { IDENTITY_RARITY_LOW_NUMBERS, ONE_MILLION, RarityTypes } from 'shared/constants';
import { CollateralData, GotchiAgingModel } from 'shared/models';

import { collaterals } from 'data/collaterals.data';

import { ItemUtils } from './item.utils';

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

  public static getStakedAmount(collateralAddress: string, stakedAmount: string): number {
    const collateral: Undefinable<CollateralData> = collaterals.find(
      (collateral: CollateralData) => collateral.address === collateralAddress
    );

    return EthersApi.fromWei(stakedAmount, collateral?.decimals) || 0;
  }

  public static getIdentityRarity(identityQuantity: number) {
    if (identityQuantity >= IDENTITY_RARITY_LOW_NUMBERS.common) {
      return RarityTypes.Common;
    } else if (identityQuantity >= IDENTITY_RARITY_LOW_NUMBERS.uncommon) {
      return RarityTypes.Uncommon;
    } else if (identityQuantity >= IDENTITY_RARITY_LOW_NUMBERS.rare) {
      return RarityTypes.Rare;
    } else if (identityQuantity >= IDENTITY_RARITY_LOW_NUMBERS.mythical) {
      return RarityTypes.Mythical;
    } else if (identityQuantity === IDENTITY_RARITY_LOW_NUMBERS.godlike) {
      return RarityTypes.Godlike;
    } else {
      return RarityTypes.Unknown;
    }
  }
  public static modifyTraits(gotchis: CustomAny): CustomAny {
    const gotchisCache: CustomAny[] = [...gotchis];

    return gotchisCache.map((gotchi) => {
      const gotchiCache = { ...gotchi };

      if (gotchiCache.equippedSetID && ItemUtils.isExistingSetId(gotchiCache.equippedSetID)) {
        const modifiers = ItemUtils.getSetModifiers(gotchiCache.equippedSetID);
        const brsBoots = modifiers.reduce((a, b) => Math.abs(a) + Math.abs(b), 0);

        gotchiCache.modifiedRarityScore = +gotchiCache.modifiedRarityScore + brsBoots;
        gotchiCache.modifiedNumericTraits = gotchiCache.modifiedNumericTraits.map((item: CustomAny, index: number) => {
          return index > 3 ? item : item + modifiers[index + 1];
        });
      }

      return gotchiCache;
    });
  }
}
