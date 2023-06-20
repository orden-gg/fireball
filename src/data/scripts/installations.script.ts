import ethers from 'ethers';
import fs from 'fs';
import _ from 'lodash';
// @ts-ignore
import { CustomAny } from 'types/global.js';

// @ts-ignore
import { INSTALLATIONS_CONTRACT_WITH_SIGNER } from './api/scripts.api.ts';

// @ts-ignore
import { InstallationTypes } from '../../shared/constants/enums/enums.ts';

console.log('⏳ retrieving data from blockhain ⌛');

INSTALLATIONS_CONTRACT_WITH_SIGNER.getInstallationTypes([])
  .then((res: CustomAny) => {
    const modified = _.cloneDeep(res);

    res.forEach((installation, index) => {
      const name = modified[index][InstallationTypes.Name];

      // Remove level from name
      modified[index][InstallationTypes.Name] = name.replace(/level [1-9]/gi, '');

      // ! Modify BigNumber`s => number`s
      modified[index][InstallationTypes.AlchemicaCost] = installation.alchemicaCost.map((alchemica) => {
        return parseInt(ethers.utils.formatUnits(alchemica));
      });
      modified[index][InstallationTypes.HarvestRate] = parseInt(ethers.utils.formatUnits(installation.harvestRate));
      modified[index][InstallationTypes.Capacity] = parseInt(ethers.utils.formatUnits(installation.capacity));
      modified[index][InstallationTypes.Prerequisites] = installation.prerequisites.map((alchemica) => {
        return parseInt(ethers.utils.formatUnits(alchemica));
      });
    });

    fs.writeFileSync('src/data/installations.data.json', JSON.stringify(modified), 'utf-8');

    console.log(`✅ successfully recorded ${modified.length} installations ✅`);
  })
  .catch((error) => console.log('❌', error, '❌'));
