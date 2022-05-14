import axios from 'axios';

const api = 'https://api.aavegotchi.land';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    async getAddressInfo(address) {
        return await axios.get(`${api}/address_info?address=${address}`)
            .then(r => r.data);
    },

    async getAddressItemization(address) {
        return await axios.get(`${api}/itemization?address=${address}`)
            .then(r => r.data.itemizations);
    },
}
