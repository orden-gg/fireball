import { ethers } from 'ethers';

export interface Block {
  hash: string;
  parentHash: string;
  number: number;
  timestamp: number;
  nonce: string;
  difficulty: number;
  gasLimit: ethers.BigNumber;
  gasUsed: ethers.BigNumber;
  miner: string;
  extraData: string;
  transactions: string[];
}
