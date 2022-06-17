
import ethers from 'ethers';
import fs from 'fs';
import _ from 'lodash';
import 'dotenv/config'

import { TILES_CONTRACT } from '../../api/common/constants.js';
import { TileTypes } from '../types.js';
import TILES_ABI from '../abi/tiles.abi.js';

const provider = new ethers.providers.JsonRpcProvider(`https://polygon-mainnet.infura.io/v3/${process.env.POLYGON_PROVIDER_API_KEY}`);
const tilesContract = new ethers.Contract(TILES_CONTRACT, TILES_ABI, provider);

console.log('⏳ retrieving data from blockhain ⌛')

tilesContract.getTileTypes([])
    .then(res => {
        const modified = _.cloneDeep(res);

        res.forEach((tile, index) => {
            // ! Modify alchemica costs (bigNumber => number)
            modified[index][TileTypes.AlchemicaCost] = tile.alchemicaCost.map(alchemica => {
                return parseInt(ethers.utils.formatUnits(alchemica))
            });
        });

        fs.writeFileSync(`src/data/tiles.json`, JSON.stringify(modified), 'utf-8');

        console.log(`✅ successfully recorded ${modified.length} tiles ✅`);
    })
    .catch(error => console.log('❌', error, '❌'))
