import { EthersApi } from 'api';

import GUILD_REGISTRATION_ABI from '../abis/guild-registration.abi.json';
import { GUILD_CONTRACT } from '../constants';
import { GuildFormValuesResult } from '../models';

export class GuildRegistrationApi {
  public static async createGuildSafe(uri: GuildFormValuesResult) {
    const contractWithSigner = EthersApi.makeContractWithSigner(GUILD_CONTRACT, GUILD_REGISTRATION_ABI);

    try {
      return await contractWithSigner.createGuild(JSON.stringify(uri));
    } catch (error) {
      return false;
    }
  }
}
