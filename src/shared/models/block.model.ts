export interface Block {
  hash: string;
  parentHash: string;
  number: number;
  timestamp: number;
  nonce: string;
  difficulty: number;
  baseFeePerGas: number;
  gasLimit: number;
  gasUsed: number;
  miner: string;
  extraData: string;
  transactions: string[];
}
