import 'dotenv/config';
import ethers from 'ethers';
import fs from 'fs';

// @ts-ignore
import { MAIN_CONTRACT } from '../../shared/constants/api.constants.ts';

const abiFile = fs.readFileSync('src/data/abi/main.abi.json');
const MAIN_ABI = JSON.parse(abiFile.toString());

const provider = new ethers.providers.JsonRpcProvider(
  `https://polygon-mainnet.infura.io/v3/${process.env.POLYGON_PROVIDER_API_KEY}`
);
const mainContract = new ethers.Contract(MAIN_CONTRACT, MAIN_ABI, provider);

console.log('⏳ retrieving data from blockhain ⌛');

mainContract
  .getWearableSets()
  .then((res: CustomAny) => {
    fs.writeFileSync('src/data/sets.data.json', JSON.stringify(res), 'utf-8');

    console.log(`✅ successfully recorded ${res.length} sets ✅`);
  })
  .catch((error) => console.log('❌', error, '❌'));
