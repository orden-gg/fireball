import axios from 'axios';

const api = 'https://dev.fireball.gg/api';

// TODO check if this api is needed
export class FireballApi {
  public static async getFireGotchiById(id: CustomAny): Promise<CustomAny> {
    return await axios.get(`${api}/ghosts/?id=${id}`).then((r) => r.data.results[0]);
  }

  public static async getGotchisAmountByGuild(name: CustomAny): Promise<CustomAny> {
    return await axios.get(`${api}/guild/?id=${name}`).then((r) => r.data);
  }
}
