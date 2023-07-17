import { ForgeTypes } from 'shared/constants';
import { ForgeItem } from 'shared/models/forge.model';

import { ItemUtils } from 'utils';

export class ForgeUtils {
  public static getItemImage(item: ForgeItem): string {
    let path: string = '';

    if (item.category === ForgeTypes.Alloy) {
      path = item.category;
    } else if (item.category === ForgeTypes.Essence) {
      path = item.category;
    } else if (item.category === ForgeTypes.Geode) {
      path = `geodes/${item.rarity}`;
    } else if (item.category === ForgeTypes.Core) {
      path = `cores/${item.category}_${item.slot}_${item.rarity}`;
    } else if (item.category === ForgeTypes.Schematic) {
      path = `schematics/${item.tokenId}`;
    }

    try {
      return require(`../assets/images/forge/${path}.svg`).default;
    } catch (error) {
      return require('../assets/images/image-placeholder.svg').default;
    }
  }
  public static getItemName(item: ForgeItem): string {
    switch (item.category) {
      case ForgeTypes.Alloy:
        return item.category;
      case ForgeTypes.Essence:
        return item.category;
      case ForgeTypes.Geode:
        return `${item.rarity} ${item.category}`;
      case ForgeTypes.Core:
        return `${item.rarity} ${item.slot} ${item.category}`;
      case ForgeTypes.Schematic:
        return `${ItemUtils.getNameById(item.tokenId)} ${item.category}`;
      default:
        return 'unknown';
    }
  }
}
