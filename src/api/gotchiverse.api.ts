import { setup } from 'axios-cache-adapter';

const api = setup({
  baseURL: 'https://api.gotchiverse.io',

  cache: {
    maxAge: 10 * 60 * 1000, // caching for 10 mins
    exclude: { query: false }
  }
});

const noCacheOptions = {
  cache: { maxAge: 0 }
};

export class GotchiverseApi {
  public static getOnlineCount(disableCache: CustomAny): Promise<CustomAny> {
    return api
      .get('/users/online', disableCache && noCacheOptions)
      .then((res) => res.data.count)
      .catch((e) => console.log(e));
  }

  public static getParcelImage(id: CustomAny, imageSize: CustomAny, disableCache: CustomAny): Promise<CustomAny> {
    return api
      .get(
        `/realm/map/load?map=citaadel&format=rgba-buffer-integers&parcel=${id},${imageSize}`,
        disableCache && noCacheOptions
      )
      .then((res) => res.data)
      .catch((e) => console.log(e));
  }
}
