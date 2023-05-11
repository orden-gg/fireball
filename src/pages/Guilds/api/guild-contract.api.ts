import { EthersApi } from 'api';

import GUILD_ABI from '../abis/guild.abi.json';
import { GUILD_CONTRACT } from '../constants';
import { GuildFormValuesResult } from '../models';

const contractWithSigner = EthersApi.makeContractWithSigner(GUILD_CONTRACT, GUILD_ABI);

export class GuildContractApi {
  public static async createGuildSafe(uri: GuildFormValuesResult) {
    try {
      return await contractWithSigner.createGuild(JSON.stringify(uri));
    } catch (error) {
      return false;
    }
  }

  public static async joinGuild(guildTokenId: string): Promise<boolean> {
    try {
      const transaction = await contractWithSigner.joinGuild(guildTokenId);

      return EthersApi.waitForTransaction(transaction.hash, 'polygon').then((res: CustomAny) => Boolean(res.status));
    } catch (error) {
      return false;
    }
  }
}