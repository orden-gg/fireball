import tiles from 'data/tiles.data.json';
import { TileTypes } from 'data/types';

export class TilesUtils {
    public static getNameById(id: any): any {
        return tiles[id] && tiles[id][TileTypes.Name];
    }

    public static getImageById(id: any): any {
        try {
            return require(`../assets/images/tiles/${id}.png`).default;
        } catch (error) {
            return require('../assets/images/image-placeholder.svg').default;
        }
    }
}
