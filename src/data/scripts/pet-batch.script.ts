import axios from 'axios';
import 'dotenv/config';
import { ContractTransaction, ethers } from 'ethers';

import {
  MAIN_CONTRACT_WITH_SIGNER,
  SCRIPT_WALLET_ADDRESS,
  getGasPrice // @ts-ignore
} from './api/scripts.api.js';

// @ts-ignore
import { HALF_DAY_MILLIS } from '../../shared/constants/date.constants.js';
// @ts-ignore
import { GRAPH_CORE_API } from '../../shared/constants/the-graph.constants.js';

interface Gotchi {
  gotchiId: string;
  name: string;
  lastInteracted: string;
}
// Interval repeater and tx cost limit
const repeatTimer = 5 * 60 * 1000;
const txCostLimit = 400 * 1e9;

const PET_ADDRESSES = [
  {
    name: 'dudendy',
    address: '0x1315B9510Cd7f75A63BB59bA7d9D1FAd083d0667'
  },
  {
    name: 'yanik 1',
    address: '0xc46d3c9d93febdd5027c9b696fe576dc654c66de'
  },
  {
    name: 'yanik 2',
    address: '0xdCf4DBd159aFc0fd71BCf1BfA97ccf23646EAbc0'
  },
  {
    name: 'yanik 3',
    address: '0xf1d88980505e00db65609ec5420f40c3eb1b77fd'
  },
  {
    name: 'dimas',
    address: '0x65E43244d19C3e17058Dfb6F5e5E921402EbD964'
  },
  {
    name: 'skv 1',
    address: '0x509c39f7A55666fDc2ac90b085b39B41D0f089A0'
  },
  {
    name: 'skv 2',
    address: '0xADA8aA2777825bc615C5F12126F8bf275E2245e5'
  },
  {
    name: 'skv 3',
    address: '0x510C64217d35FF91cB5099E160b75C5cbC593fd2'
  },
  {
    name: 'hope',
    address: '0x471666E34Ce58891Dc4d265DC92A48511Beb330a'
  }
];

console.log(`🧑 operator: ${SCRIPT_WALLET_ADDRESS}`);

const collectIds = async (name: string, address: string): Promise<Gotchi[]> => {
  const currentUTC = Date.now();
  const interactionWaypoint = parseInt(((currentUTC - HALF_DAY_MILLIS) / 1000).toString());

  const petQuery = `{
    user(id: "${address.toLowerCase()}") {
        gotchisOriginalOwned(
            first: 1000,
            where: { lastInteracted_lte: "${interactionWaypoint}" })
        {
            gotchiId
            name
            lastInteracted
        }
    }
  }`;

  // ! check if operator is approved
  return await MAIN_CONTRACT_WITH_SIGNER.isPetOperatorForAll(address, SCRIPT_WALLET_ADDRESS)
    .then((res: boolean) => {
      console.log(`🧑 owner: ${name}, address: ${address}`);
      console.log(`👀 operator is approved: ${res.toString()}`);

      if (!res) {
        console.log('terminated!');

        return [];
      }
    })
    .then(async () => {
      // ! get all gotchis for petting
      return await axios
        .post(GRAPH_CORE_API, { query: petQuery })
        .then(async (res) => {
          const gotchis: Gotchi[] = res.data.data.user.gotchisOriginalOwned;

          console.log(`👻 gotchis for petting: ${gotchis.length.toString()}`);

          return gotchis;
        })
        .catch((e) => {
          console.log(e);

          return [];
        });
    });
  // return [{ gotchiId: 'aaa', lastInteracted: '222', name: 'yoo' }];
};

const pet = async () => {
  const gotchis: Gotchi[] = [];

  for (const user of PET_ADDRESSES) {
    const { name, address } = user;
    const collectedGotchis = await collectIds(name, address);

    if (collectedGotchis.length) {
      gotchis.push(...collectedGotchis);
    }
  }

  if (!gotchis.length) {
    console.log('No gotchis avaialble for petting!');
    console.log('next pet in', repeatTimer / 60000, 'minutes');

    return false;
  }

  const gasPriceGwei = await getGasPrice();

  if (gasPriceGwei.toNumber() >= txCostLimit) {
    console.log(`💱 ${'to high tx cost: maximum'} ${txCostLimit.toString()} current ${gasPriceGwei.toString()}`);
    console.log('next pet in', repeatTimer / 60000, 'minutes');

    return false;
  }

  console.log(`💱 tx cost: maximum - ${txCostLimit} current - ${gasPriceGwei.toString()}`);

  const gasPrice = ethers.utils.formatUnits(gasPriceGwei, 'gwei');
  const gotchiIds = gotchis.map((gotchi) => gotchi.gotchiId);

  console.log(`👻 petting: ${gotchis.length.toString()}`);
  console.log(`🚀 gas price: ${Number(gasPrice).toFixed(2)}`);

  await MAIN_CONTRACT_WITH_SIGNER.interact(gotchiIds, {
    gasPrice: gasPriceGwei
  }).then(async (tx: ContractTransaction) => {
    console.log(`${'Tx sent!'} https://polygonscan.com/tx/${tx.hash}`);
    console.log('waiting Tx approval...');

    // ! wait for pet transaction to display result
    await tx
      .wait()
      .then(() => {
        console.log('Happy folks:', gotchis.length);
        console.log(gotchis.map((gotchi) => `${gotchi.gotchiId}: ${gotchi.name}`));
        console.log('next pet in', repeatTimer / 60000, 'minutes');

        return true;
      })
      .catch((error: CustomAny) => {
        console.log(`${'Tx failed!'}, reason: ${error.reason}, ${error.code}`);
        console.log('next pet in', repeatTimer / 60000, 'minutes');

        return false;
      });
  });
};

pet();
