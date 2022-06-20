import axios from 'axios';

const api = 'https://dev.fireball.gg/api';

// TODO check if this api is needed
export const getFireGotchiById = async (id: any): Promise<any> => {
    return await axios.get(`${api}/ghosts/?id=${id}`)
        .then(r => r.data.results[0]);
};

export const getGotchisAmountByGuild = async (name: any): Promise<any> => {
    return await axios.get(`${api}/guild/?id=${name}`)
        .then(r => r.data);

};
