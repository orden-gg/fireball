import tiles from 'data/tiles.json';
import { TileTypes } from 'data/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getNameById(id) {
        if (!tiles[id]) {
            return 'Unknown';
        }

        return tiles[id][TileTypes.Name];
    },

    getImageById(id) {
        try {
            return require(`../assets/images/tiles/${id}.png`).default;
        } catch (error) {
            return require('../assets/images/image-placeholder.svg').default;
        }
    }
};
