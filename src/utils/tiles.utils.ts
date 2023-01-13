import tiles from 'data/tiles.data.json';
import { TileTypes } from 'shared/constants';
import { TileItem } from 'shared/models';

export class TilesUtils {
    public static getMetadataById(id: any): TileItem {
        return {
            name: this.getNameById(id),
            alchemicaCost: TilesUtils.getAlchemicaCostById(id),
            craftTime: TilesUtils.getCraftTimeById(id),
            deprecated: TilesUtils.getDeprecatedById(id),
            width: TilesUtils.getWidthById(id),
            height: TilesUtils.getHeightById(id),
            type: 'tile'
        };
    }

    public static getTileExist(id: number): boolean {
        return Boolean(tiles[id]);
    }

    public static getWidthById(id: number): any {
        return tiles[id][TileTypes.Width];
    }

    public static getHeightById(id: number): any {
        return tiles[id][TileTypes.Height];
    }

    public static getIsTileExist(id: number): boolean {
        return Boolean(tiles[id]);
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

    public static combineTiles(tiles) {
        return tiles
            .filter((item: any) => TilesUtils.getTileExist(item.tileId))
            .map((inst: any) => ({
                id: inst.tileId,
                name: TilesUtils.getNameById(inst.tileId)
            }))
            .reduce((prev: any, current) => {
                const duplicated = prev.find(inst => inst.id === current.id);

                if (duplicated) {
                    duplicated.quantity++;

                    return prev;
                }

                return prev.concat({
                    ...current,
                    quantity: 1
                });
            }, [])
            .sort((a, b) => a.id - b.id)
            .sort((a, b) => b.level - a.level);
    }
}
