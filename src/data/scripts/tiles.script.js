
import 'dotenv/config';
import ethers from 'ethers';
import fs from 'fs';
import _ from 'lodash';

import { TileTypes } from 'shared/enums';
import { TILES_CONTRACT } from '../../api/common/constants.js';

const TILES_ABI = JSON.parse(fs.readFileSync('src/data/abi/tiles.abi.json'));

const provider = new ethers.providers.JsonRpcProvider(`https://polygon-mainnet.infura.io/v3/${process.env.POLYGON_PROVIDER_API_KEY}`);
const tilesContract = new ethers.Contract(TILES_CONTRACT, TILES_ABI, provider);

console.log('⏳ retrieving data from blockhain ⌛');

tilesContract.getTileTypes([])
    .then(res => {
        const modified = _.cloneDeep(res);

        res.forEach((tile, index) => {
            // ! Modify BigNumber`s => number`s
            modified[index][TileTypes.AlchemicaCost] = tile.alchemicaCost.map(alchemica => {
                return parseInt(ethers.utils.formatUnits(alchemica));
            });
        });

        fs.writeFileSync('src/data/tiles.data.json', JSON.stringify(modified), 'utf-8');

        console.log(`✅ successfully recorded ${modified.length} tiles ✅`);
    })
    .catch(error => console.log('❌', error, '❌'));
