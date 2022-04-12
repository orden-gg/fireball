import axios from 'axios';

const apiUrl = 'https://api.gotchiverse.io';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    async getOnlineCount() {
        return await axios.get(`${apiUrl}/users/online`).then((response) => {
            return response.data.count;
        }).catch((e) => console.log(e));
    },
}
