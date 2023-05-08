import { EthersApi } from 'api';

import GUILD_ABI from '../abis/guild.abi.json';
import { GUILD_CONTRACT } from '../constants';
import { GuildFormValuesResult } from '../models';

const contract = EthersApi.makeContract(GUILD_CONTRACT, GUILD_ABI, 'localhost');

export class GuildRegistrationApi {
  public static async createGuildSafe(uri: GuildFormValuesResult) {
    const contractWithSigner = EthersApi.makeContractWithSigner(GUILD_CONTRACT, GUILD_ABI);

    try {
      return await contractWithSigner.createGuild(JSON.stringify(uri));
    } catch (error) {
      return false;
    }
  }

  public static getContract() {
    return contract;
  }
}
