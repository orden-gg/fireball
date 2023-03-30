import { Contract } from 'ethers';

import { GUILD_REGISTRATION_CONTRACT } from '../constants/api.constants';
import { EthersApi } from 'api';

import GUILD_REGISTRATION_ABI from '../abis/guild-registration.abi.json';

const guildContract = EthersApi.makeContract(GUILD_REGISTRATION_CONTRACT, GUILD_REGISTRATION_ABI, 'georli');

export class GuildRegistrationApi {
  public static getContract(): Contract {
    return guildContract;
  }

  public static createGuildSafe() {}
}
