import tiles from 'data/tiles.data.json';
import { TileTypes } from 'shared/constants';

export class TilesUtils {
    public static getMetadataById(id: any): any {
        return {
            name: this.getNameById(id),
            alchemicaCost: TilesUtils.getAlchemicaCostById(id),
            craftTime: TilesUtils.getCraftTimeById(id),
            deprecated: TilesUtils.getDeprecatedById(id)
        };
    }

    public static getNameById(id: any): any {
        return tiles[id] && tiles[id][TileTypes.Name];
    }

    public static getAlchemicaCostById(id: any): any {
        return tiles[id][TileTypes.AlchemicaCost];
    }

    public static getCraftTimeById(id: any): any {
        return tiles[id][TileTypes.CraftTime];
    }

    public static getDeprecatedById(id: any): any {
        return tiles[id][TileTypes.Deprecated];
    }

    public static getImageById(id: any): any {
        try {
            return require(`../assets/images/tiles/${id}.png`).default;
        } catch (error) {
            return require('../assets/images/image-placeholder.svg').default;
        }
    }
}
