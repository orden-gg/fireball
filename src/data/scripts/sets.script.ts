import fs from 'fs';
// @ts-ignore
import { CustomAny } from 'types/global.js';

// @ts-ignore
import { MAIN_CONTRACT_WITH_SIGNER } from './api/scripts.api.ts';

console.log('⏳ retrieving data from blockhain ⌛');

MAIN_CONTRACT_WITH_SIGNER.getWearableSets()
  .then((res: CustomAny) => {
    fs.writeFileSync('src/data/sets.data.json', JSON.stringify(res), 'utf-8');

    console.log(`✅ successfully recorded ${res.length} sets ✅`);
  })
  .catch((error) => console.log('❌', error, '❌'));
