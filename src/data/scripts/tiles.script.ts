import ethers from 'ethers';
import fs from 'fs';
import _ from 'lodash';
// @ts-ignore
import { CustomAny } from 'types/global.js';

// @ts-ignore
import { TILES_CONTRACT_WITH_SIGNER } from './api/scripts.api.ts';

// @ts-ignore
import { TileTypes } from '../../shared/constants/enums/enums.ts';

console.log('⏳ retrieving data from blockhain ⌛');

TILES_CONTRACT_WITH_SIGNER.getTileTypes([])
  .then((res: CustomAny) => {
    const modified = _.cloneDeep(res);

    res.forEach((tile, index) => {
      // ! Modify BigNumber`s => number`s
      modified[index][TileTypes.AlchemicaCost] = tile.alchemicaCost.map((alchemica) => {
        return parseInt(ethers.utils.formatUnits(alchemica));
      });
    });

    fs.writeFileSync('src/data/tiles.data.json', JSON.stringify(modified), 'utf-8');

    console.log(`✅ successfully recorded ${modified.length} tiles ✅`);
  })
  .catch((error) => console.log('❌', error, '❌'));
