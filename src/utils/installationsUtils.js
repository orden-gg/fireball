import installations from 'data/installations';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getInstallationNameById(id) {
        return installations[id]?.name || '';
    },

    getInstallationImage(id) {
        try {
            return require(`../assets/images/installations/${id}.gif`).default;
        } catch (error) {
            return require(`../assets/images/image-placeholder.svg`).default;
        }
    }
}
