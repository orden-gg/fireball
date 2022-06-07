import axios from 'axios';

const api = 'https://dev.fireball.gg/api';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    async getFireGotchiById(id) {
        return await axios.get(`${api}/ghosts/?id=${id}`)
            .then(r => r.data.results[0]);
    },

    async getGotchisAmountByGuild(name) {
        return await axios.get(`${api}/guild/?id=${name}`)
            .then(r => r.data);

    }
};
