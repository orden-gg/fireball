import axios from 'axios';
import 'dotenv/config';
import { BigNumber, ContractTransaction, ethers } from 'ethers';
import { exit } from 'process';
// @ts-ignore
import { CustomAny } from 'types/global.js';

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
  SETTINGS,
  TOKEN_CONTRACT_WITH_SIGNER,
  callWithRetries,
  chunkArray,
  getGasPrice,
  getTokenName,
  paint // @ts-ignore
} from './api/scripts.api.ts';

// @ts-ignore
import { GRAPH_CORE_API } from '../../shared/constants/the-graph.constants.ts';

const txCostLimit = 400 * 1e9;

const { OPERATOR_PRIVATE_KEY } = process.env;

const TOKENS = [
  FUD_CONTRACT,
  FOMO_CONTRACT,
  ALPHA_CONTRACT,
  KEK_CONTRACT
  // GHST_CONTRACT
];

// borrower_not: "0x0000000000000000000000000000000000000000",
// borrower: "0x8ba922eb891a734f17b14e7ff8800e6626912e5d",
const lendingsQuery = `{
  gotchiLendings(
    first: 1000,
    orderBy: gotchiKinship,
    orderDir: desc,
    where:{
      lender_in: ${JSON.stringify(SETTINGS.ADDRESSES_TO_MANAGE)},
      borrower_not: "0x0000000000000000000000000000000000000000",
      cancelled: false,
      completed: false
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

console.log(`🧑 operator: ${paint(SCRIPT_WALLET_ADDRESS, CONSOLE_COLORS.Pink)}`);

const claim = async () => {
  if (!OPERATOR_PRIVATE_KEY) {
    console.log('Please specify OPERTOR_PRIVATE_KEY in .env');
    exit();
  }

  return await axios.post(GRAPH_CORE_API, { query: lendingsQuery }).then(async (response) => {
    if (response.data.errors) {
      console.log(paint('error!', CONSOLE_COLORS.Red), response.data.errors);
    }

    const lendings = response.data.data.gotchiLendings;
    const toClaim: CustomAny = [];

    console.log('sumonning', lendings.length, 'lendings');

    if (SETTINGS.RETRIEVE_BALANCE) {
      console.log('retriewing', lendings.length, 'gotchis balances');
      console.log('balance chank size', SETTINGS.BALANCE_CHUNK_SIZE);

      const chunk = chunkArray(lendings, SETTINGS.BALANCE_CHUNK_SIZE);
      let processed = 0;

      for (let i = 0; i < chunk.length; i++) {
        const promises = chunk[i].map((lending: CustomAny) => tokensPromises(lending.gotchi.escrow));

        await Promise.all(promises)
          .then((tokensResponse) => {
            tokensResponse.forEach((tokens, gotchiIndex) => {
              const index = processed + gotchiIndex;
              const obj = { lendingId: lendings[index].id, gotchiId: lendings[index].gotchiTokenId };

              for (const tkn of tokens) {
                obj[tkn.name] = tkn.amount;
              }

              toClaim.push(obj);
            });

            processed += chunk[i].length;
            console.log('done', processed, 'of', lendings.length);
          })
          .catch(() => console.log('something went wrong!'));
      }
    } else {
      lendings.forEach((lending: CustomAny) => {
        toClaim.push({
          lendingId: lending.id,
          gotchiId: lending.gotchiTokenId
        });
      });
    }

    if (toClaim.length) {
      if (toClaim[0].fud) {
        console.log('fud', calculateToken(toClaim, 'fud'));
      }
      if (toClaim[0].fomo) {
        console.log('fomo', calculateToken(toClaim, 'fomo'));
      }
      if (toClaim[0].alpha) {
        console.log('alpha', calculateToken(toClaim, 'alpha'));
      }
      if (toClaim[0].kek) {
        console.log('kek', calculateToken(toClaim, 'kek'));
      }
      if (toClaim[0].ghst) {
        console.log('ghst', calculateToken(toClaim, 'ghst'));
      }
    }

    // TODO: filter function as param
    // const gotchiIds = toClaim.filter((g) => Number(g.ghst) > 0).map((gotchi) => gotchi.gotchiId);
    const gotchiIds = toClaim.map((gotchi) => gotchi.gotchiId);

    console.log('👻', gotchiIds.length);

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

    // check if gotchis are available
    if (gotchiIds.length > 0 && !SETTINGS.RETRIEVE_BALANCE) {
      console.log('tx chank size', SETTINGS.TRANSACTION_CHUNK_SIZE);
      const chunk = chunkArray(gotchiIds, SETTINGS.TRANSACTION_CHUNK_SIZE);
      let processed = 0;

      // loop through chunks
      for (let i = 0; i < chunk.length; i++) {
        await callWithRetries(
          MAIN_CONTRACT_WITH_SIGNER,
          SETTINGS.FINISH_LENDING ? 'batchClaimAndEndGotchiLending' : 'batchClaimGotchiLending',
          3,
          5,
          [chunk[i], { gasPrice: gasBoosted }]
        )
          // await MAIN_CONTRACT_WITH_SIGNER[SETTINGS.FINISH_LENDING ? 'batchClaimAndEndGotchiLending' : 'batchClaimGotchiLending'](
          //   chunk[i],
          //   // { gasPrice: gasBoosted, gasLimit: 9000000 } // TODO: gas limit is required when you ending lending
          //   { gasPrice: gasBoosted }
          // )
          .then(async (tx: ContractTransaction) => {
            console.log(`${paint('Tx sent!', CONSOLE_COLORS.Green)} https://polygonscan.com/tx/${tx.hash}`);
            console.log('waiting Tx approval...');

            // wait for transaction to display result
            await tx
              .wait()
              .then(() => {
                console.log(paint('Happy folks:', CONSOLE_COLORS.Pink), chunk[i].length);
                console.log(chunk[i]);

                processed += chunk[i].length;
                console.log('done', processed, 'of', gotchiIds.length);

                return true;
              })
              .catch((error: CustomAny) => {
                console.log(`${paint('Tx failed!', CONSOLE_COLORS.Red)}, reason: ${error.reason}, ${error.code}`);

                return false;
              });
          });
      }
    } else {
      console.log(paint('no gotchis to claim :(', CONSOLE_COLORS.Red));
    }
  });
};

claim();

const tokensPromises = async (address: string) => {
  const promises = TOKENS.map(async (token: string) =>
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
