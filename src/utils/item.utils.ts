import _ from 'lodash';

import {
  ItemTypeNames,
  ItemTypes,
  RarityTypes,
  SetTypes,
  WEARABLE_SLOTS,
  WearableBenefitIndex,
  WearableTypes,
  WerableBenefitTypes
} from 'shared/constants';

import {
  AggressionIcon,
  BrainIcon,
  EnergyIcon,
  EyeColorIcon,
  EyeShapeIcon,
  SpookinessIcon
} from 'components/Icons/Icons';

import items from 'data/items.data.json';
import sets from 'data/sets.data.json';

export class ItemUtils {
  public static getNameById(id: number | string): string {
    return items[Number(id)][ItemTypes.Name] as string;
  }

  public static getDescriptionById(id: number | string): string {
    return items[Number(id)][ItemTypes.Description] as string;
  }

  public static getAuthorById(id: number | string): string {
    return items[Number(id)][ItemTypes.Author] as string;
  }

  public static getTraitModifiersById(id: number | string): number[] {
    return items[Number(id)][ItemTypes.TraitModifiers] as number[];
  }

  public static getSlotPositionsById(id: number | string): boolean[] {
    return items[Number(id)][ItemTypes.SlotPositions] as boolean[];
  }

  public static getTotalQuantityById(id: number | string): number {
    return items[Number(id)][ItemTypes.TotalQuantity] as number;
  }

  public static getRarityScoreModifierById(id: number | string): number {
    return items[Number(id)][ItemTypes.RarityScoreModifier] as number;
  }

  public static getRarityNameById(id: number | string): string {
    switch (items[Number(id)][ItemTypes.RarityScoreModifier]) {
      case 1:
        return RarityTypes.Common;
      case 2:
        return RarityTypes.Uncommon;
      case 5:
        return RarityTypes.Rare;
      case 10:
        return RarityTypes.Legendary;
      case 20:
        return RarityTypes.Mythical;
      case 50:
        return RarityTypes.Godlike;
      default:
        return RarityTypes.Unknown;
    }
  }

  public static getWearableTypeById(id: number | string): string {
    return items[Number(id)][ItemTypes.WearableType] as string;
  }

  public static getWearableBenefitsById(id: number | string): { first: string; second: string } {
    const benefit: CustomAny = items[Number(id)][ItemTypes.WearableBenefitType];

    return {
      first: benefit ? benefit[WearableBenefitIndex.First] : WerableBenefitTypes.Unknown,
      second: benefit ? benefit[WearableBenefitIndex.Second] : WerableBenefitTypes.Unknown
    };
  }

  public static getTypeNameById(id: number | string): string {
    switch (items[Number(id)][ItemTypes.Category]) {
      case 0:
        return ItemTypeNames.Wearable;
      case 1:
        return ItemTypeNames.Badge;
      case 2:
        return ItemTypeNames.Consumable;
      default:
        return 'unknown';
    }
  }

  public static getSlotsById(id: number | string): string[] {
    const slotsNames: string[] = [];
    const slots: CustomAny = items[Number(id)][ItemTypes.SlotPositions];

    slots.forEach((slot: boolean, index: number) => slot && slotsNames.push(WEARABLE_SLOTS[index]));

    return slotsNames;
  }

  public static getTraitIconByKey(key: string): CustomAny {
    const TRAITS_ICONS: CustomAny = {
      agg: AggressionIcon,
      brn: BrainIcon,
      eyc: EyeColorIcon,
      eys: EyeShapeIcon,
      nrg: EnergyIcon,
      spk: SpookinessIcon
    };

    return TRAITS_ICONS[key];
  }

  public static getItemRarityName(id: CustomAny): CustomAny {
    switch (id) {
      case '0':
        return RarityTypes.Common;
      case '1':
        return RarityTypes.Uncommon;
      case '2':
        return RarityTypes.Rare;
      case '3':
        return RarityTypes.Legendary;
      case '4':
        return RarityTypes.Mythical;
      case '5':
        return RarityTypes.Godlike;
      case '6':
        return RarityTypes.Drop;
      default:
        return null;
    }
  }

  public static getItemRarityId(rarity: CustomAny): CustomAny {
    switch (rarity) {
      case RarityTypes.Common:
        return '0';
      case RarityTypes.Uncommon:
        return '1';
      case RarityTypes.Rare:
        return '2';
      case RarityTypes.Legendary:
        return '3';
      case RarityTypes.Mythical:
        return '4';
      case RarityTypes.Godlike:
        return '5';
      default:
        return '-1';
    }
  }

  public static getTraitIconByName(trait: CustomAny): CustomAny {
    return require(`../assets/images/traits/${trait}.png`).default;
  }

  public static getPortalImg(hauntId: CustomAny): CustomAny {
    try {
      return require(`../assets/images/portals/h${hauntId}-opened.svg`).default;
    } catch (error) {
      return require('../assets/images/image-placeholder.svg').default;
    }
  }

  public static getWearableImg(id: CustomAny): CustomAny {
    try {
      return require(`../assets/images/wearables/${id}.svg`).default;
    } catch (error) {
      return require('../assets/images/image-placeholder.svg').default;
    }
  }

  public static getTicketImg(name: CustomAny): CustomAny {
    try {
      return require(`../assets/images/tickets/${name}.svg`).default;
    } catch (error) {
      return require('../assets/images/image-placeholder.svg').default;
    }
  }

  public static getItemUrl(item: CustomAny): CustomAny {
    try {
      return `https://app.aavegotchi.com/baazaar/${item.__typename === 'ERC1155Listing' ? 'erc1155' : 'erc721'}/${
        item.id
      }`;
    } catch (error) {
      console.error(error);

      return 'https://app.aavegotchi.com/baazaar';
    }
  }

  public static getSetName(id: number | string): string {
    return sets[Number(id)][SetTypes.Name] as string;
  }

  public static getSetWearables(id: number | string): number[] {
    return sets[Number(id)][SetTypes.WearableIds] as number[];
  }

  public static getSetModifiers(id: number | string): number[] {
    return sets[Number(id)][SetTypes.TraitsBonuses] as number[];
  }

  public static isExistingSetId(id: number | string): boolean {
    return id <= sets.length;
  }

  public static combineTraitsModifiers = (traitsMatrix: number[][]): number[] => {
    const result: number[] = [];

    for (const traitsArray of traitsMatrix) {
      traitsArray.forEach((value, index) => {
        if (result[index] !== undefined) {
          result[index] += value;
        } else {
          result[index] = value;
        }
      });
    }

    return result;
  };

  public static getIsTraitsModifiersFit = (traits: number[], wearablesModifiers: number[]): boolean => {
    const isSetAvailable: boolean = traits.every((trait: number, index: number) =>
      trait >= 50 ? wearablesModifiers[index] >= 0 : wearablesModifiers[index] <= 0
    );

    return isSetAvailable;
  };

  public static getBonusRsByTraits = (modifiers: number[], traits: number[]): number => {
    const traitsWithModifiers: number[] = traits.map((trait: number, index: number) => trait + modifiers[index]);

    return traitsWithModifiers.reduce((prev: number, current: number, index: number) => {
      return prev + Math.abs(current - traits[index]);
    }, 0);
  };

  public static getEquippedWearables = (wearables: number[]): number[] => {
    const equippedWearables: number[] = _.fill(Array(16), 0);

    for (const wearableId of wearables) {
      const slotPositions: boolean[] = ItemUtils.getSlotPositionsById(wearableId);
      const slotId: number = slotPositions.findIndex((isCurrentSlot: boolean) => isCurrentSlot);

      if (equippedWearables[slotId] !== 0) {
        equippedWearables[WearableTypes.LHand] = wearableId;
      } else {
        equippedWearables[slotId] = wearableId;
      }
    }

    return equippedWearables;
  };
}
