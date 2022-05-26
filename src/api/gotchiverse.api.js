import axios from 'axios';

const apiUrl = 'https://api.gotchiverse.io';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    async getOnlineCount() {
        return await axios.get(`${apiUrl}/users/online`)
            .then(response => response.data.count)
            .catch(e => console.log(e));
    },

    async getParcelColorMap(id, size) {
        return await axios.get(`https://api.gotchiverse.io/realm/map/load?map=citaadel&format=rgba-buffer-integers&parcel=${id},${size}`)
            .then(response => response.data)
            .catch(e => console.log(e));
    },

    async getParcelsByTokenIds(ids) {
        return await axios.get(`https://api.gotchiverse.io/realm/parcel/info?tokenId=${ids.join(',')}`)
            .then(response => {
                return response.data.data
            })
            .catch(e => console.log(e));
    }
}
