import tiles from 'data/tiles.data.json';
import { TileTypes } from 'data/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getMetadataById(id) {
        return {
            name: this.getNameById(id),
            type: this.getTypeById(id),
            alchemicaCost: this.getAlchemicaCostById(id),
            craftTime: this.getCraftTimeById(id),
            deprecated: this.getDeprecatedById(id)
        }
    },

    getImageById(id) {
        try {
            return require(`../assets/images/tiles/${id}.png`).default;
        } catch (error) {
            return require('../assets/images/image-placeholder.svg').default;
        }
    },

    getNameById(id) {
        return tiles[id][TileTypes.Name];
    },

    getAlchemicaCostById(id) {
        return tiles[id][TileTypes.AlchemicaCost];
    },

    getCraftTimeById(id) {
        return tiles[id][TileTypes.CraftTime];
    },

    getTypeById(id) {
        switch (tiles[id][TileTypes.Type]) {
            case 0:
                return 'tile'
        }
    },

    getDeprecatedById(id) {
        return tiles[id][TileTypes.Deprecated];
    }
};
