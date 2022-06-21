import axios from 'axios';

const api = 'https://dev.fireball.gg/api';

// TODO check if this api is needed
export class FireballApi {
    public static async getFireGotchiById (id: any): Promise<any> {
        return await axios.get(`${api}/ghosts/?id=${id}`)
            .then(r => r.data.results[0]);
    }

    public static async getGotchisAmountByGuild (name: any): Promise<any> {
        return await axios.get(`${api}/guild/?id=${name}`)
            .then(r => r.data);
    }
}
