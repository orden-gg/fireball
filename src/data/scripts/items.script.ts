import 'dotenv/config';
import ethers from 'ethers';
import fs from 'fs';
import _ from 'lodash';

// @ts-ignore
import { MAIN_CONTRACT } from '../../shared/constants/api.constants.ts';

// @ts-ignore
import { Erc1155NumberCategories, ItemTypes } from '../../shared/constants/enums/enums.ts';
// @ts-ignore
import { WEARABLES_TYPES_BENEFITS } from '../wearable-types-benefits.data.ts';

const abiFile = fs.readFileSync('src/data/abi/main.abi.json');
const MAIN_ABI = JSON.parse(abiFile.toString());

const provider = new ethers.providers.JsonRpcProvider(
  `https://polygon-mainnet.infura.io/v3/${process.env.POLYGON_PROVIDER_API_KEY}`
);
const mainContract = new ethers.Contract(MAIN_CONTRACT, MAIN_ABI, provider);

console.log('⏳ retrieving data from blockhain ⌛');

mainContract
  .getItemTypes([])
  .then((res: CustomAny) => {
    const modified = _.cloneDeep(res);

    res.forEach((item, index) => {
      // ! Modify BigNumber`s => number`s
      modified[index][ItemTypes.Id] = index;
      modified[index][ItemTypes.GhstPrice] = parseInt(ethers.utils.formatUnits(item.ghstPrice));
      modified[index][ItemTypes.MaxQuantity] = parseInt(ethers.utils.formatUnits(item.maxQuantity, 0));
      modified[index][ItemTypes.TotalQuantity] = parseInt(ethers.utils.formatUnits(item.totalQuantity, 0));

      if (modified[index][ItemTypes.Category] === Erc1155NumberCategories.Wearable) {
        const wearableType = WEARABLES_TYPES_BENEFITS.find((wearableType) =>
          wearableType.ids.find((id) => id === index)
        );

        if (wearableType) {
          modified[index][ItemTypes.WearableType] = wearableType.type;
          modified[index][ItemTypes.WearableBenefitType] = [wearableType.benefit.first, wearableType.benefit.second];
        }
      }
    });

    fs.writeFileSync('src/data/items.data.json', JSON.stringify(modified), 'utf-8');

    console.log(`✅ successfully recorded ${modified.length} items ✅`);
  })
  .catch((error) => console.log('❌', error, '❌'));
