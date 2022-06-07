import { installations } from 'data/installations';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getNameById(id) {
        return installations[id][15] || '';
    },

    getImageById(id) {
        try {
            return require(`../assets/images/installations/${id}.png`).default;
        } catch (error) {
            return require('../assets/images/image-placeholder.svg').default;
        }
    }
};
