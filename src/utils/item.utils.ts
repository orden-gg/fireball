import _ from 'lodash';

import {
  ItemTypeNames,
  ItemTypes,
  RarityTypes,
  SetTypes,
  WearableBenefitIndex,
  WearableTypes,
  WEARABLE_SLOTS
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
    return items[id][ItemTypes.Name];
  }

  public static getDescriptionById(id: number | string): string {
    return items[id][ItemTypes.Description];
  }

  public static getAuthorById(id: number | string): string {
    return items[id][ItemTypes.Author];
  }

  public static getTraitModifiersById(id: number | string): number[] {
    return items[id][ItemTypes.TraitModifiers];
  }

  public static getSlotPositionsById(id: number | string): boolean[] {
    return items[id][ItemTypes.SlotPositions];
  }

  public static getTotalQuantityById(id: number | string): number {
    return items[id][ItemTypes.TotalQuantity];
  }

  public static getRarityScoreModifierById(id: number | string): number {
    return items[id][ItemTypes.RarityScoreModifier];
  }

  public static getRarityNameById(id: number | string): string {
    switch (items[id][ItemTypes.RarityScoreModifier]) {
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
        return 'unknown';
    }
  }

  public static getWearableTypeById(id: number | string): string {
    return items[id][ItemTypes.WearableType];
  }

  public static getWearableBenefitsById(id: number | string): { first: string; second: string } {
    return {
      first: items[id][ItemTypes.WearableBenefitType][WearableBenefitIndex.First],
      second: items[id][ItemTypes.WearableBenefitType][WearableBenefitIndex.Second]
    };
  }

  public static getTypeNameById(id: number | string): string {
    switch (items[id][ItemTypes.Category]) {
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
    const slots = items[id][ItemTypes.SlotPositions];

    slots.forEach((slot: boolean, index) => slot && slotsNames.push(WEARABLE_SLOTS[index]));

    return slotsNames;
  }

  public static getTraitIconByKey(key: string): any {
    const TRAITS_ICONS: any = {
      agg: AggressionIcon,
      brn: BrainIcon,
      eyc: EyeColorIcon,
      eys: EyeShapeIcon,
      nrg: EnergyIcon,
      spk: SpookinessIcon
    };

    return TRAITS_ICONS[key];
  }

  public static getItemType(item: any): any {
    const itemMap: any = {
      ERC721Listing: {
        '0': () => {
          return 'closed_portal';
        },
        '2': () => {
          return 'open_portal';
        },
        '3': () => {
          return 'aavegotchi';
        },
        '4': () => {
          return 'realm';
        }
      },
      ERC1155Listing: {
        '0': () => {
          return 'wearable';
        },
        '2': () => {
          return 'consumable';
        },
        '3': () => {
          return 'ticket';
        }
      },
      ERC1155Purchase: {
        '0': () => {
          return 'wearable';
        },
        '2': () => {
          return 'consumable';
        },
        '3': () => {
          return 'ticket';
        }
      }
    };

    return itemMap[item.__typename][item.category]();
  }

  public static getBaazaarItemRarityName(item: any): any {
    if (item.__typename === 'ERC1155Listing') {
      return this.getItemRarityName(item.rarityLevel);
    } else {
      return null;
    }
  }

  public static getItemRarityName(id: any): any {
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

  public static getItemRarityId(rarity: any): any {
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

  public static getTraitIconByName(trait: any): any {
    return require(`../assets/images/traits/${trait}.png`).default;
  }

  public static getItemImg(item: any): any {
    const typeMap: any = {
      wearable: () => returnWearable(),
      closed_portal: () => {
        return require('../assets/images/portals/h1-sealed.svg').default;
      },
      open_portal: () => {
        return require('../assets/images/portals/h1-opened.svg').default;
      },
      realm: () => {
        return require('../assets/images/portals/h1-sealed.svg').default;
      },
      consumable: () => returnWearable(),
      ticket: () => returnTicket.call(this)
    };

    function returnWearable(): any {
      try {
        return require(`../assets/images/wearables/${item.erc1155TypeId}.svg`).default;
      } catch (error) {
        return require('../assets/images/image-placeholder.svg').default;
      }
    }

    function returnTicket(): any {
      try {
        return require(`../assets/images/tickets/${ItemUtils.getBaazaarItemRarityName(item)}.svg`).default;
      } catch (error) {
        return require('../assets/images/image-placeholder.svg').default;
      }
    }

    return typeMap[this.getItemType(item)]();
  }

  public static getPortalImg(hauntId: any): any {
    try {
      return require(`../assets/images/portals/h${hauntId}-opened.svg`).default;
    } catch (error) {
      return require('../assets/images/image-placeholder.svg').default;
    }
  }

  public static getWearableImg(id: any): any {
    try {
      return require(`../assets/images/wearables/${id}.svg`).default;
    } catch (error) {
      return require('../assets/images/image-placeholder.svg').default;
    }
  }

  public static getTicketImg(name: any): any {
    try {
      return require(`../assets/images/tickets/${name}.svg`).default;
    } catch (error) {
      return require('../assets/images/image-placeholder.svg').default;
    }
  }

  public static getItemUrl(item: any): any {
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
    return sets[id][SetTypes.Name];
  }

  public static getSetWearables(id: number | string): number[] {
    return sets[id][SetTypes.WearableIds];
  }

  public static getSetModifiers(id: number | string): number[] {
    return sets[id][SetTypes.TraitsBonuses];
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

  public static getIsSetAvailable = (traits: number[], wearablesModifiers: number[]): boolean => {
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
