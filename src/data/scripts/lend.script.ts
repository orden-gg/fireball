import axios from 'axios';
import 'dotenv/config';
import { BigNumber, ContractTransaction, ethers } from 'ethers';
import { exit } from 'process';

import {
  ALPHA_CONTRACT,
  FOMO_CONTRACT,
  FUD_CONTRACT, // GHST_CONTRACT,
  KEK_CONTRACT // @ts-ignore
} from '../../shared/constants/api.constants.ts';
// @ts-ignore
import {
  CONSOLE_COLORS,
  MAIN_CONTRACT_WITH_SIGNER,
  SCRIPT_WALLET_ADDRESS,
  TOKEN_CONTRACT_WITH_SIGNER,
  callWithRetries,
  chunkArray,
  getGasPrice,
  getTokenName,
  paint // @ts-ignore
} from './api/scripts.api.ts';

// @ts-ignore
import { GRAPH_CORE_API } from '../../shared/constants/the-graph.constants.ts';

// tx cost limit
const txCostLimit = 220 * 1e9;

const { OPERATOR_PRIVATE_KEY } = process.env;
// const OWNER = '0x1315B9510Cd7f75A63BB59bA7d9D1FAd083d0667';
const OWNER = '0xc46d3c9d93febdd5027c9b696fe576dc654c66de';
// const OWNER = '0xdcf4dbd159afc0fd71bcf1bfa97ccf23646eabc0';
const LEND_OWNER = SCRIPT_WALLET_ADDRESS;

const GET_BALANCE = false; // retrieve gotchis balance (took pretty much time)
// ! the bigger the chunk size the faster the script will run but the more likely it will fail (also quantity of TOKENS affects it)
const BALANCE_CHUNK_SIZE = 20; // chunk size for retrieving balance requests
const TRANSACTION_CHUNK_SIZE = 20; // chunk size for batch requests
const EXECUTE = true; // execute transactions or not (true or false)

// ! [owner, borrower, third_party]
// const SPLIT = [0, 95, 5];
// const SPLIT = [0, 100, 0];
const SPLIT = [85, 10, 5]; // YANIK default
// const WHITELIST = 435;
// const WHITELIST = 6329;
const WHITELIST = 717;
const COST = 0;
const PERIOD = 1;
// const THIRD_PARTY = '0x5d2a46e38c08769d2f4dcc9dd5d9cbd958c177e9'; // !default
const THIRD_PARTY = '0x6865ae680c92Bf047D08Aa7F40CA2Ec5a4f01C5a'; // !YANIK default
// const THIRD_PARTY = '0x0000000000000000000000000000000000000000'; // !default

const TOKENS = [
  FUD_CONTRACT,
  FOMO_CONTRACT,
  ALPHA_CONTRACT,
  KEK_CONTRACT
  // GHST_CONTRACT
];

const aavegotchiQuery = `{
  aavegotchis(
    first: 1000,
    skip: 80,
    where:{
      lending: null,
      activeListing: null,
      owner_: { id: "${OWNER.toLowerCase()}" }
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
    const toLend: any = [];

    console.log('sumonned', gotchis.length, 'gotchis');

    if (GET_BALANCE) {
      console.log('retriewing', gotchis.length, 'gotchis balances');
      console.log('balance chank size', BALANCE_CHUNK_SIZE);

      const chunk = chunkArray(gotchis, BALANCE_CHUNK_SIZE);
      let processed = 0;

      for (let i = 0; i < chunk.length; i++) {
        const promises = chunk[i].map((gotchi: any) => tokensPromises(gotchi.escrow));

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
      gotchis.forEach((gotchi: any) => toLend.push(gotchi));
    }

    if (toLend[0].ghst) {
      console.log('ghst', calculateToken(toLend, 'ghst'));
    }

    // TODO: filter function as param
    // const tuples = toLend
    //   .filter((g) => Number(g.ghst) > 0)
    //   .map((gotchi) => {
    //     return [gotchi.id, COST, PERIOD * 60 * 60, SPLIT, LEND_OWNER, THIRD_PARTY, WHITELIST, TOKENS];
    //   });
    const tuples = toLend.map((gotchi) => {
      return [gotchi.id, COST, PERIOD * 60 * 60, SPLIT, LEND_OWNER, THIRD_PARTY, WHITELIST, TOKENS];
    });

    console.log('to lend', tuples.length);

    const gasPriceGwei = await getGasPrice();
    const gasPrice = ethers.utils.formatUnits(gasPriceGwei, 'gwei');
    const gasBoost = ethers.utils.parseUnits('30', 'gwei');
    const gasBoosted = BigNumber.from(gasPriceGwei).add(gasBoost);

    if (gasPriceGwei >= txCostLimit) {
      console.log(
        `💱 ${paint('to high tx cost: maximum', CONSOLE_COLORS.Red)} ${paint(
          txCostLimit.toString(),
          CONSOLE_COLORS.Red
        )} current ${paint(gasPriceGwei, CONSOLE_COLORS.Pink)}`
      );
      console.log(paint('Terminated!', CONSOLE_COLORS.Red));

      return;
    }

    console.log(`💱 tx cost: maximum - ${txCostLimit} current - ${paint(gasPriceGwei, CONSOLE_COLORS.Pink)}`);
    console.log(`🚀 gas price: ${paint(Number(gasPrice).toFixed(2), CONSOLE_COLORS.Pink)}`);

    if (tuples.length > 0 && EXECUTE) {
      console.log('tx chank size', TRANSACTION_CHUNK_SIZE);
      const chunk = chunkArray(tuples, TRANSACTION_CHUNK_SIZE);
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
              console.log(chunk[i].map((t: any) => t[0]));

              processed += chunk[i].length;
              console.log('done', processed, 'of', tuples.length);

              return true;
            })
            .catch((error: any) => {
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
  const promises = TOKENS.map(async (token: string) =>
    callWithRetries(TOKEN_CONTRACT_WITH_SIGNER(token), 'balanceOf', 3, 5, [address]).then((amount: any) => ({
      name: getTokenName(token),
      amount: Number(ethers.utils.formatUnits(amount)).toFixed(amount > 0 ? 1 : 0)
    }))
  );

  return await Promise.all(promises);
};

const calculateToken = (array: any[], token: string) => {
  return Number(array.reduce((acc, gotchi) => acc + Number(gotchi[token]), 0).toFixed(0));
};
