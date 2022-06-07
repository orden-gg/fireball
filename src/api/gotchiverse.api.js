import axios from 'axios';

const apiUrl = 'https://api.gotchiverse.io';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    async getOnlineCount() {
        return await axios.get(`${apiUrl}/users/online`)
            .then(response => response.data.count)
            .catch(e => console.log(e));
    },

    async getParcelColorBySizeMap(id, size) {
        return await axios.get(`https://api.gotchiverse.io/realm/map/load?map=citaadel&format=rgba-buffer-integers&parcel=${id},${size}`)
            .then(response => response.data)
            .catch(e => console.log(e));
    }
};
