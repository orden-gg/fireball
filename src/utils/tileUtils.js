import tiles from 'data/tiles';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getNameById(id) {
        return tiles[id]?.name || '';
    },

    getImageById(id) {
        try {
            return require(`../assets/images/tiles/${id}.gif`).default;
        } catch (error) {
            return require(`../assets/images/image-placeholder.svg`).default;
        }
    }
}
