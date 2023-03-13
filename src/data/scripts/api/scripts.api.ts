import 'dotenv/config';
import { Wallet, ethers } from 'ethers';
import fs from 'fs';

// @ts-ignore
import { MAIN_CONTRACT, POLYGON_RPC } from '../../../shared/constants/api.constants.ts';

const main_abi_file = fs.readFileSync('src/data/abi/main.abi.json');
const MAIN_ABI = JSON.parse(main_abi_file.toString());

const tokenAbiFile = fs.readFileSync('src/data/abi/token.abi.json');
const TOKEN_ABI = JSON.parse(tokenAbiFile.toString());

const provider: any = new ethers.providers.JsonRpcProvider(POLYGON_RPC);

export const SCRIPT_WALLET: Wallet = new ethers.Wallet(process.env.OPERATOR_PRIVATE_KEY as string, provider);
export const SCRIPT_WALLET_ADDRESS = SCRIPT_WALLET.address.toLowerCase();

export const getGasPrice = async () => {
  return await provider.getGasPrice();
};

export const SCRIPT_WALLET_NONCE = async () => {
  return await provider.getTransactionCount(SCRIPT_WALLET_ADDRESS);
};

export const MAIN_CONTRACT_WITH_SIGNER = new ethers.Contract(MAIN_CONTRACT, MAIN_ABI, SCRIPT_WALLET);

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
export const paint = (text: 'string', color: 'string') => {
  return `${color}${text}${CONSOLE_COLORS.White}`;
};
