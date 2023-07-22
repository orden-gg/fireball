import axios from 'axios';
import 'dotenv/config';
import { BigNumber, ContractTransaction, ethers } from 'ethers';
import { exit } from 'process';
// @ts-ignore
import { CustomAny } from 'types/global.js';

// @ts-ignore
import {
  CONSOLE_COLORS,
  MAIN_CONTRACT_WITH_SIGNER,
  SCRIPT_WALLET_ADDRESS,
  SETTINGS,
  TOKEN_CONTRACT_WITH_SIGNER,
  TX_COST_LIMIT,
  callWithRetries,
  chunkArray,
  coreChecks,
  getGasPrice,
  getTokenName,
  isEthAddress,
  paint // @ts-ignore
} from './api/scripts.api.ts';

// @ts-ignore
import { GRAPH_CORE_API } from '../../shared/constants/the-graph.constants.ts';

let LEND_OWNER: string;

const THIRD_PARTY_DEFAULT = '0x0000000000000000000000000000000000000000';
// if no split third party % set - use default address
const THIRD_PARTY = SETTINGS.SPLIT[2] > 0 ? SETTINGS.THIRD_PARTY : THIRD_PARTY_DEFAULT;

const aavegotchiQuery = `{
  aavegotchis(
    first: 1000,
    where:{
      ${SETTINGS.LENDING_RELIST ? 'lending_not: null,' : 'lending: null,'}
      activeListing: null,
      kinship_gt: ${SETTINGS.KINSHIP_GT},
      kinship_lt: ${SETTINGS.KINSHIP_LT},
      owner_in: [${SETTINGS.ADDRESSES_TO_MANAGE.map((address: string) => `"${address.toLowerCase()}"`)}],
      ${SETTINGS.GOTCHI_IDS && SETTINGS.GOTCHI_IDS.length > 0 ? `id_in: [${SETTINGS.GOTCHI_IDS}],` : ''}
      ${
        SETTINGS.GOTCHI_IGNORE_IDS && SETTINGS.GOTCHI_IGNORE_IDS.length > 0
          ? `id_not_in: [${SETTINGS.GOTCHI_IGNORE_IDS}],`
          : ''
      }
    }
  ) {
    id
    name
    kinship
    escrow
  }
}`;

const lendingsQuery = `{
  gotchiLendings(
    first: 1000,
    orderBy: gotchiKinship,
    orderDir: desc,
    where:{
      lender_in: [${SETTINGS.ADDRESSES_TO_MANAGE.map((address: string) => `"${address.toLowerCase()}"`)}],
      borrower: null,
      cancelled: false,
      completed: false,
      ${SETTINGS.GOTCHI_IDS && SETTINGS.GOTCHI_IDS.length > 0 ? `gotchiTokenId_in: [${SETTINGS.GOTCHI_IDS}],` : ''}
      ${
        SETTINGS.GOTCHI_IGNORE_IDS && SETTINGS.GOTCHI_IGNORE_IDS.length > 0
          ? `gotchiTokenId_not_in: [${SETTINGS.GOTCHI_IGNORE_IDS}],`
          : ''
      }
    }
  ) {
    id
    lastClaimed
    gotchiTokenId
    gotchiKinship
    whitelistId
    gotchi {
      escrow
    }
  }
}`;

coreChecks();

if (
  isEthAddress(SETTINGS.LENDING_OWNER) ||
  SETTINGS.LENDING_OWNER === 'owner' ||
  SETTINGS.LENDING_OWNER === 'operator'
) {
  if (isEthAddress(SETTINGS.LENDING_OWNER)) {
    LEND_OWNER = SETTINGS.LENDING_OWNER;
  } else if (SETTINGS.LENDING_OWNER === 'owner') {
    LEND_OWNER = SETTINGS.ADDRESSES_TO_MANAGE[0];
  } else {
    LEND_OWNER = SCRIPT_WALLET_ADDRESS;
  }

  console.log(
    paint('LENDING_OWNER =>', CONSOLE_COLORS.Yellow),
    paint(
      isEthAddress(SETTINGS.LENDING_OWNER) ? SETTINGS.LENDING_OWNER : `${SETTINGS.LENDING_OWNER}: ${LEND_OWNER}`,
      CONSOLE_COLORS.Green
    )
  );
} else {
  console.log(paint('please provide valid value for LENDING_OWNER', CONSOLE_COLORS.Red));
  console.log(paint('> t_e.r,m!i/n*a^t>e"d <', CONSOLE_COLORS.Red));
  exit();
}

const lend = async () => {
  const promises = [
    axios.post(GRAPH_CORE_API, { query: aavegotchiQuery }),
    axios.post(GRAPH_CORE_API, { query: lendingsQuery })
  ];

  await Promise.all(promises).then(async ([aavegotchis_res, lendings_res]) => {
    if (aavegotchis_res.data.errors || lendings_res.data.error) {
      console.log(paint('error!', CONSOLE_COLORS.Red), aavegotchis_res.data.errors);
      console.log(paint('> t_e.r,m!i/n*a^t>e"d <', CONSOLE_COLORS.Red));
    }

    let gotchis = aavegotchis_res.data.data.aavegotchis;
    const lendings = lendings_res.data.data.gotchiLendings;
    const toLend: CustomAny = [];

    if (!SETTINGS.LENDING_RELIST && lendings.length) {
      gotchis = aavegotchis_res.data.data.aavegotchis.filter(
        (gotchi) => !lendings.some((lending) => Object.values(lending).includes(gotchi.id))
      );
    }

    console.log('sumonned', gotchis.length, 'gotchis');

    if (gotchis.length > 0) {
      const idsArr = gotchis.map((g) => Number(g.id));
      console.log('ids:');
      console.dir(idsArr, { maxArrayLength: null });
    }

    if (SETTINGS.CHECK_BALANCE) {
      console.log('retriewing', gotchis.length, 'gotchis balances');
      console.log('balance chank size', SETTINGS.TRANSACTION_CHUNK_SIZE);

      const chunk = chunkArray(gotchis, SETTINGS.TRANSACTION_CHUNK_SIZE);
      let processed = 0;

      for (let i = 0; i < chunk.length; i++) {
        const promises = chunk[i].map((gotchi: CustomAny) => tokensPromises(gotchi.escrow));

        await Promise.all(promises)
          .then((tokensResponse) => {
            tokensResponse.forEach((tokens, gotchiIndex) => {
              const index = processed + gotchiIndex;
              const obj = { id: gotchis[index].id };

              for (const tkn of tokens) {
                obj[tkn.name] = tkn.amount;
              }

              toLend.push(obj);
            });

            processed += chunk[i].length;
            console.log('done', processed, 'of', gotchis.length);
          })
          .catch(() => console.log('something went wrong!'));
      }
    } else {
      gotchis.forEach((gotchi: CustomAny) => toLend.push(gotchi));
    }

    if (toLend.length) {
      if (toLend[0].fud) {
        console.log(paint('fud', CONSOLE_COLORS.Pink), calculateToken(toLend, 'fud'));
      }
      if (toLend[0].fomo) {
        console.log(paint('fomo', CONSOLE_COLORS.Pink), calculateToken(toLend, 'fomo'));
      }
      if (toLend[0].alpha) {
        console.log(paint('alpha', CONSOLE_COLORS.Pink), calculateToken(toLend, 'alpha'));
      }
      if (toLend[0].kek) {
        console.log(paint('kek', CONSOLE_COLORS.Pink), calculateToken(toLend, 'kek'));
      }
      if (toLend[0].ghst) {
        console.log(paint('ghst', CONSOLE_COLORS.Pink), calculateToken(toLend, 'ghst'));
      }
    }

    // TODO: filter function as param
    // const tuples = toLend
    //   .filter((g) => Number(g.ghst) > 0)
    //   .map((gotchi) => {
    //     return [gotchi.id, SETTINGS.COST, SETTINGS.PERIOD * 60 * 60, SETTINGS.SPLIT, LEND_OWNER, THIRD_PARTY, SETTINGS.WHITELIST, TOKENS];
    //   });
    const tuples = toLend.map((gotchi) => {
      return [
        gotchi.id,
        SETTINGS.COST,
        SETTINGS.PERIOD * 60 * 60,
        SETTINGS.SPLIT,
        LEND_OWNER,
        THIRD_PARTY,
        SETTINGS.WHITELIST ? SETTINGS.WHITELIST : 0,
        SETTINGS.TOKENS,

        SETTINGS.CHANNELING_ALLOWED
          ? constructPermissionsBitMap({
              permissionsAllowed: 1,
              channellingAllowed: 1
            })
          : 0
      ];
    });

    console.log('👻', tuples.length);

    if (tuples.length === 0) {
      console.log(paint('no gotchis to lend :(', CONSOLE_COLORS.Red));
    }

    if (tuples.length > 0 && !SETTINGS.CHECK_BALANCE) {
      const gasPriceGwei = await getGasPrice();
      const gasPrice = ethers.utils.formatUnits(gasPriceGwei, 'gwei');
      const gasBoost = ethers.utils.parseUnits('30', 'gwei');
      const gasBoosted = BigNumber.from(gasPriceGwei).add(gasBoost);

      if (gasPriceGwei >= TX_COST_LIMIT) {
        console.log(
          `💱 ${paint('to high tx cost: maximum', CONSOLE_COLORS.Red)} ${paint(
            TX_COST_LIMIT.toString(),
            CONSOLE_COLORS.Red
          )} current ${paint(gasPriceGwei, CONSOLE_COLORS.Pink)}`
        );
        console.log(paint('> t_e.r,m!i/n*a^t>e"d <', CONSOLE_COLORS.Red));

        return;
      }

      console.log(`💱 tx cost: maximum - ${TX_COST_LIMIT} current - ${paint(gasPriceGwei, CONSOLE_COLORS.Pink)}`);
      console.log(`🚀 gas price: ${paint(Number(gasPrice).toFixed(2), CONSOLE_COLORS.Pink)}`);

      console.log('tx chank size', SETTINGS.TRANSACTION_CHUNK_SIZE);
      const chunk = chunkArray(tuples, SETTINGS.TRANSACTION_CHUNK_SIZE);

      console.log('💰', SETTINGS.COST, 'ghst');
      console.log('🕜', SETTINGS.PERIOD, 'hour');
      console.log('SPLIT(owner)', SETTINGS.SPLIT[0], '%');
      console.log('SPLIT(borrower)', SETTINGS.SPLIT[1], '%');
      console.log('SPLIT(third_party)', SETTINGS.SPLIT[2], '%');
      console.log('WL', SETTINGS.WHITELIST ? SETTINGS.WHITELIST : false);
      console.log(
        'TOKENS',
        SETTINGS.TOKENS.map((token: string) => getTokenName(token))
      );

      let processed = 0;

      // loop through chunks
      for (let i = 0; i < chunk.length; i++) {
        await MAIN_CONTRACT_WITH_SIGNER.batchAddGotchiListing(chunk[i], {
          gasPrice: gasBoosted,
          gasLimit: 10000000
        }).then(async (tx: ContractTransaction) => {
          console.log(`${paint('Tx sent!', CONSOLE_COLORS.Green)} https://polygonscan.com/tx/${tx.hash}`);
          console.log('waiting Tx approval...');

          // ! wait for pet transaction to display result
          await tx
            .wait()
            .then(() => {
              console.log(paint('Tx successeful!', CONSOLE_COLORS.Green));
              console.log(chunk[i].map((t: CustomAny) => t[0]));

              processed += chunk[i].length;
              console.log('done', processed, 'of', tuples.length);

              return true;
            })
            .catch((error: CustomAny) => {
              console.log(`${paint('Tx failed!', CONSOLE_COLORS.Red)}, reason: ${error.reason}, ${error.code}`);

              return false;
            });
        });
      }
    }
  });
};

lend();

const tokensPromises = async (address: string) => {
  const promises = SETTINGS.TOKENS.map(async (token: string) =>
    callWithRetries(TOKEN_CONTRACT_WITH_SIGNER(token), 'balanceOf', 3, 5, [address]).then((amount: CustomAny) => ({
      name: getTokenName(token),
      amount: Number(ethers.utils.formatUnits(amount)).toFixed(amount > 0 ? 1 : 0)
    }))
  );

  return await Promise.all(promises);
};

const calculateToken = (array: CustomAny[], token: string) => {
  return Number(array.reduce((acc, gotchi) => acc + Number(gotchi[token]), 0).toFixed(0));
};

interface LendingPermissions {
  permissionsAllowed: 0 | 1;
  channellingAllowed: 0 | 1;

  //new lending permissions can be added here up to 32
}

function constructPermissionsBitMap(permissions: LendingPermissions) {
  let permissionsBitMap = BigInt(0);

  if (permissions.permissionsAllowed === 0) {
    return 0;
  } else {
    //loop through all object keys and set the permissions
    const totalKeys = Object.keys(permissions).length;

    for (let i = 0; i < totalKeys; i++) {
      permissionsBitMap = storeValueInBitmap(Object.values(permissions)[i], i, permissionsBitMap);
    }
  }

  return permissionsBitMap;
}

function storeValueInBitmap(value: number, position: number, bitmap: CustomAny) {
  /* eslint-disable no-param-reassign */
  bitmap &= ~(BigInt(0xff) << (BigInt(position) * BigInt(8))); // @ts-ignore

  // Set the value in the specified position
  /* eslint-disable no-param-reassign */
  bitmap |= BigInt(value) << (BigInt(position) * BigInt(8)); // @ts-ignore

  return bitmap;
}
