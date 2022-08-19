
import 'dotenv/config';
import ethers from 'ethers';
import fs from 'fs';
import _ from 'lodash';

// @ts-ignore
import { MAIN_CONTRACT } from '../../shared/constants/api.constants.ts';
// @ts-ignore
import { ItemTypes } from '../../shared/constants/enums/enums.ts';

const abiFile = fs.readFileSync('src/data/abi/main.abi.json');
const MAIN_ABI = JSON.parse(abiFile.toString());

const provider = new ethers.providers.JsonRpcProvider(`https://polygon-mainnet.infura.io/v3/${process.env.POLYGON_PROVIDER_API_KEY}`);
const mainContract = new ethers.Contract(MAIN_CONTRACT, MAIN_ABI, provider);

console.log('⏳ retrieving data from blockhain ⌛');

mainContract.getItemTypes([])
    .then((res: any) => {
        const modified = _.cloneDeep(res);

        res.forEach((item, index) => {
            // ! Modify BigNumber`s => number`s
            modified[index][ItemTypes.GhstPrice] = parseInt(ethers.utils.formatUnits(item.ghstPrice));
            modified[index][ItemTypes.MaxQuantity] = parseInt(ethers.utils.formatUnits(item.maxQuantity, 0));
            modified[index][ItemTypes.TotalQuantity] = parseInt(ethers.utils.formatUnits(item.totalQuantity, 0));
        });

        fs.writeFileSync('src/data/items.data.json', JSON.stringify(modified), 'utf-8');

        console.log(`✅ successfully recorded ${modified.length} items ✅`);
    })
    .catch(error => console.log('❌', error, '❌'));
