import 'dotenv/config';
import ethers from 'ethers';
import fs from 'fs';
import _ from 'lodash';

// @ts-ignore
import { INSTALLATION_CONTRACT } from '../../shared/constants/api.constants.ts';
// @ts-ignore
import { InstallationTypes } from '../../shared/constants/enums/enums.ts';

const abiFile = fs.readFileSync('src/data/abi/installations.abi.json');
const INSTALLATION_ABI = JSON.parse(abiFile.toString());

const provider = new ethers.providers.JsonRpcProvider(
  `https://polygon-mainnet.infura.io/v3/${process.env.POLYGON_PROVIDER_API_KEY}`
);
const installationsContract = new ethers.Contract(INSTALLATION_CONTRACT, INSTALLATION_ABI, provider);

console.log('⏳ retrieving data from blockhain ⌛');

installationsContract
  .getInstallationTypes([])
  .then((res: any) => {
    const modified = _.cloneDeep(res);

    res.forEach((installation, index) => {
      const name = modified[index][InstallationTypes.Name];

      // Remove level from name
      modified[index][InstallationTypes.Name] = name.replace(/level [1-9]/gi, '');

      // ! Modify BigNumber`s => number`s
      modified[index][InstallationTypes.AlchemicaCost] = installation.alchemicaCost.map(alchemica => {
        return parseInt(ethers.utils.formatUnits(alchemica));
      });
      modified[index][InstallationTypes.HarvestRate] = parseInt(ethers.utils.formatUnits(installation.harvestRate));
      modified[index][InstallationTypes.Capacity] = parseInt(ethers.utils.formatUnits(installation.capacity));
      modified[index][InstallationTypes.Prerequisites] = installation.prerequisites.map(alchemica => {
        return parseInt(ethers.utils.formatUnits(alchemica));
      });
    });

    fs.writeFileSync('src/data/installations.data.json', JSON.stringify(modified), 'utf-8');

    console.log(`✅ successfully recorded ${modified.length} installations ✅`);
  })
  .catch(error => console.log('❌', error, '❌'));
