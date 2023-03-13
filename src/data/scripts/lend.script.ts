import axios from 'axios';
import 'dotenv/config';
import { BigNumber, ContractTransaction, ethers } from 'ethers';
import { exit } from 'process';

import {
  ALPHA_CONTRACT,
  FOMO_CONTRACT,
  FUD_CONTRACT,
  GHST_CONTRACT,
  KEK_CONTRACT // @ts-ignore
} from '../../shared/constants/api.constants.ts';
// @ts-ignore
import {
  CONSOLE_COLORS,
  MAIN_CONTRACT_WITH_SIGNER,
  SCRIPT_WALLET_ADDRESS,
  TOKEN_CONTRACT_WITH_SIGNER,
  getGasPrice,
  paint // @ts-ignore
} from './api/scripts.api.ts';

// @ts-ignore
import { GRAPH_CORE_API } from '../../shared/constants/the-graph.constants.ts';

// tx cost limit
const txCostLimit = 220 * 1e9;

const { OPERATOR_PRIVATE_KEY } = process.env;
const OWNER = '0x1315B9510Cd7f75A63BB59bA7d9D1FAd083d0667';
// const OWNER = '0xc46d3c9d93febdd5027c9b696fe576dc654c66de';

// ! retrieve gotchis balance (took pretty much time)
const GET_BALANCE = false;

// ! [owner, borrower, third_party]
const SPLIT = [0, 95, 5];
// const SPLIT = [85, 10, 5]; // default
const WHITELIST = 435;
const COST = 0;
const PERIOD = 1;
const THIRD_PARTY = '0x5d2a46e38c08769d2f4dcc9dd5d9cbd958c177e9'; // !default
// const THIRD_PARTY = '0x6865ae680c92Bf047D08Aa7F40CA2Ec5a4f01C5a'; // !default

const TOKENS = [FUD_CONTRACT, FOMO_CONTRACT, ALPHA_CONTRACT, KEK_CONTRACT, GHST_CONTRACT];
const TOKENS_NAME = ['fud', 'fomo', 'alpha', 'kek', 'ghst'];

const aavegotchiQuery = `{
  aavegotchis(
    first: 20,
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

    console.log(gotchis.length, 'gotchis arrived');
    console.dir(
      gotchis.map((gotchi) => Number(gotchi.id)),
      { maxArrayLength: null }
    );

    if (GET_BALANCE) {
      console.log('retriewing', gotchis.length, 'gotchis balances');
      const promises = gotchis.map((gotchi: any) => tokensPromises(gotchi.escrow));

      await Promise.all(promises).then((tokensResponse) => {
        tokensResponse.forEach((tokens, gotchiIndex) => {
          const modified = tokens.map(
            (amount, index) => ` ${TOKENS_NAME[index]}: ${paint(amount, CONSOLE_COLORS.Cyan)} `
          );

          console.log(
            'gotchi',
            paint(gotchis[gotchiIndex].name, CONSOLE_COLORS.Pink),
            `(id: ${gotchis[gotchiIndex].id})`,
            '=>',
            modified.toString()
          );

          // TODO: hardcoded for only 1st token!
          if (tokens[0] > 0) {
            toLend.push({ id: gotchis[gotchiIndex].id, ghst: tokens[0] });
          }
        });
      });
    }

    // console.log(toLend.length, toLend);

    const gasPriceGwei = await getGasPrice();
    const gasPrice = ethers.utils.formatUnits(gasPriceGwei, 'gwei');
    const gasBoost = ethers.utils.parseUnits('35', 'gwei');
    const gasBoosted = BigNumber.from(gasPriceGwei).add(gasBoost);

    if (gasPriceGwei >= txCostLimit) {
      console.log(
        `💱 ${paint('to high tx cost: maximum', CONSOLE_COLORS.Red)} ${paint(
          txCostLimit,
          CONSOLE_COLORS.Red
        )} current ${paint(gasPriceGwei, CONSOLE_COLORS.Pink)}`
      );
      console.log(paint('Terminated!', CONSOLE_COLORS.Red));

      return;
    }

    console.log(`💱 tx cost: maximum - ${txCostLimit} current - ${paint(gasPriceGwei, CONSOLE_COLORS.Pink)}`);
    console.log(`🚀 gas price: ${paint(Number(gasPrice).toFixed(2), CONSOLE_COLORS.Pink)}`);

    const tuples = gotchis.map((gotchi) => {
      return [gotchi.id, COST, PERIOD * 60 * 60, SPLIT, OWNER, THIRD_PARTY, WHITELIST, TOKENS];
    });

    // const tuples = toLend.map((gotchi) => {
    //   return [gotchi.id, COST, PERIOD * 60 * 60, SPLIT, OWNER, THIRD_PARTY, WHITELIST, TOKENS];
    // });

    if (tuples.length > 0) {
      await MAIN_CONTRACT_WITH_SIGNER.batchAddGotchiListing(tuples, { gasPrice: gasBoosted, gasLimit: 20000000 }).then(
        async (tx: ContractTransaction) => {
          console.log(`${paint('Tx sent!', CONSOLE_COLORS.Green)} https://polygonscan.com/tx/${tx.hash}`);
          console.log('waiting Tx approval...');

          // ! wait for pet transaction to display result
          await tx
            .wait()
            .then(() => {
              console.log(paint('Tx successeful!', CONSOLE_COLORS.Green));

              return true;
            })
            .catch((error: any) => {
              console.log(`${paint('Tx failed!', CONSOLE_COLORS.Red)}, reason: ${error.reason}, ${error.code}`);

              return false;
            });
        }
      );
    }
  });
};

lend();

const tokensPromises = async (address: string) => {
  const promises = TOKENS.map(async (token: string) =>
    TOKEN_CONTRACT_WITH_SIGNER(token)
      .balanceOf(address)
      .then((amount: any) => Number(ethers.utils.formatUnits(amount)).toFixed(1))
  );

  return await Promise.all(promises);
};
