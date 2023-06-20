import 'dotenv/config';
import { Contract, Wallet, ethers } from 'ethers';
import fs from 'fs';
import * as toml from 'toml';

import {
  ALPHA_CONTRACT,
  FOMO_CONTRACT,
  FUD_CONTRACT,
  GHST_CONTRACT,
  INSTALLATION_CONTRACT,
  KEK_CONTRACT,
  MAIN_CONTRACT,
  POLYGON_RPC,
  TILES_CONTRACT // @ts-ignore
} from '../../../shared/constants/api.constants.ts';

const main_abi_file = fs.readFileSync('src/data/abi/main.abi.json');
const MAIN_ABI = JSON.parse(main_abi_file.toString());

const tiles_abi_file = fs.readFileSync('src/data/abi/tiles.abi.json');
const TILES_ABI = JSON.parse(tiles_abi_file.toString());

const installations_abi_file = fs.readFileSync('src/data/abi/installations.abi.json');
const INSTALLATIONS_ABI = JSON.parse(installations_abi_file.toString());

const tokenAbiFile = fs.readFileSync('src/data/abi/token.abi.json');
const TOKEN_ABI = JSON.parse(tokenAbiFile.toString());

const provider: CustomAny = new ethers.providers.JsonRpcProvider(POLYGON_RPC);

export const SETTINGS = toml.parse(fs.readFileSync('src/data/scripts/scripts.toml') as CustomAny);
export const TX_COST_LIMIT = SETTINGS.TX_COST_LIMIT * 1e9;

export const SCRIPT_WALLET: Wallet = new ethers.Wallet(process.env.OPERATOR_PRIVATE_KEY as string, provider);
export const SCRIPT_WALLET_ADDRESS = SCRIPT_WALLET.address.toLowerCase();

export const getGasPrice = async () => {
  return await provider.getGasPrice();
};

export const SCRIPT_WALLET_NONCE = async () => {
  return await provider.getTransactionCount(SCRIPT_WALLET_ADDRESS);
};

export const MAIN_CONTRACT_WITH_SIGNER = new ethers.Contract(MAIN_CONTRACT, MAIN_ABI, SCRIPT_WALLET);

export const TILES_CONTRACT_WITH_SIGNER = new ethers.Contract(TILES_CONTRACT, TILES_ABI, SCRIPT_WALLET);

export const INSTALLATIONS_CONTRACT_WITH_SIGNER = new ethers.Contract(
  INSTALLATION_CONTRACT,
  INSTALLATIONS_ABI,
  SCRIPT_WALLET
);

export const TOKEN_CONTRACT_WITH_SIGNER = (contract: string) => {
  return new ethers.Contract(contract, TOKEN_ABI, SCRIPT_WALLET);
};

export enum CONSOLE_COLORS {
  Black = '\x1B[30m',
  Red = '\x1B[31m',
  Green = '\x1B[32m',
  Yellow = '\x1B[33m',
  Blue = '\x1B[34m',
  Pink = '\x1B[35m',
  Cyan = '\x1B[36m',
  Light = '\x1B[37m',
  White = '\x1B[39m'
}

export const paint = (text: string, color: string) => {
  return `${color}${text}${CONSOLE_COLORS.White}`;
};

export const getTokenName = (token: string) => {
  switch (token) {
    case FUD_CONTRACT:
      return 'fud';
    case FOMO_CONTRACT:
      return 'fomo';
    case ALPHA_CONTRACT:
      return 'alpha';
    case KEK_CONTRACT:
      return 'kek';
    case GHST_CONTRACT:
      return 'ghst';
    default:
      return 'unknown';
  }
};

export const chunkArray = (array: CustomAny[], chunkSize: number) => {
  const result: CustomAny[] = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }

  return result;
};

export const callWithRetries = async (
  contract: Contract,
  method: string,
  retries: number,
  delay: number, // seconds
  args: CustomAny[] = [] // Set the default value for args to an empty array
): Promise<ethers.ContractTransaction> => {
  while (retries > 0) {
    try {
      // Call the contract method
      const result = await contract[method](...args);

      // If the call is successful, return the result
      return result;
    } catch (error) {
      console.error(`Error calling contract method '${method}':`, error);

      /* eslint-disable no-param-reassign */
      retries--;

      // If there are remaining retries, wait for the specified delay before trying again
      if (retries > 0) {
        console.log(`Retrying in ${delay} s...`);
        await new Promise((resolve) => setTimeout(resolve, delay * 1000));
      }
    }
  }

  // If all retries are exhausted, throw an error
  throw new Error(`Failed to call contract method '${method}' after ${retries} retries.`);
};
