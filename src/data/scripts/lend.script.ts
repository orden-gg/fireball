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
  getGasPrice,
  getTokenName,
  paint // @ts-ignore
} from './api/scripts.api.ts';

// @ts-ignore
import { GRAPH_CORE_API } from '../../shared/constants/the-graph.constants.ts';

const { OPERATOR_PRIVATE_KEY } = process.env;

const LEND_OWNER = SCRIPT_WALLET_ADDRESS;

const THIRD_PARTY_DEFAULT = '0x0000000000000000000000000000000000000000';
// if no split third party % set - use default address
const THIRD_PARTY = SETTINGS.SPLIT[2] > 0 ? SETTINGS.THIRD_PARTY : THIRD_PARTY_DEFAULT;

// owner_: { id: "${OWNER.toLowerCase()}" }
const aavegotchiQuery = `{
  aavegotchis(
    first: 1000,
    where:{
      lending: null,
      activeListing: null,
      owner_in: [${SETTINGS.ADDRESSES_TO_MANAGE.map((address: string) => `"${address.toLowerCase()}"`)}]
    }
  ) {
    id
    name
    kinship
    escrow
  }
}`;

console.log(`🧑 operator: ${paint(SCRIPT_WALLET_ADDRESS, CONSOLE_COLORS.Pink)}`);

const lend = async () => {
  if (!OPERATOR_PRIVATE_KEY) {
    console.log('Please specify OPERTOR_PRIVATE_KEY in .env');
    exit();
  }

  return await axios.post(GRAPH_CORE_API, { query: aavegotchiQuery }).then(async (response) => {
    if (response.data.errors) {
      console.log(paint('error!', CONSOLE_COLORS.Red), response.data.errors);
    }

    const gotchis = response.data.data.aavegotchis;
    const toLend: CustomAny = [];

    console.log('sumonned', gotchis.length, 'gotchis');

    if (gotchis.length > 0) {
      const idsArr = gotchis.map((g) => Number(g.id));
      console.log('ids:');
      console.dir(idsArr, { maxArrayLength: null });
    }

    if (SETTINGS.CHECK_BALANCE) {
      console.log('retriewing', gotchis.length, 'gotchis balances');
      console.log('balance chank size', SETTINGS.BALANCE_CHUNK_SIZE);

      const chunk = chunkArray(gotchis, SETTINGS.BALANCE_CHUNK_SIZE);
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
        SETTINGS.WHITELIST,
        SETTINGS.TOKENS
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
        console.log(paint('Terminated!', CONSOLE_COLORS.Red));

        return;
      }

      console.log(`💱 tx cost: maximum - ${TX_COST_LIMIT} current - ${paint(gasPriceGwei, CONSOLE_COLORS.Pink)}`);
      console.log(`🚀 gas price: ${paint(Number(gasPrice).toFixed(2), CONSOLE_COLORS.Pink)}`);

      console.log('tx chank size', SETTINGS.TRANSACTION_CHUNK_SIZE);
      const chunk = chunkArray(tuples, SETTINGS.TRANSACTION_CHUNK_SIZE);
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
