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

const txCostLimit = 450 * 1e9;

const { OPERATOR_PRIVATE_KEY } = process.env;

const TOKENS = [
  FUD_CONTRACT,
  FOMO_CONTRACT,
  ALPHA_CONTRACT,
  KEK_CONTRACT
  // GHST_CONTRACT
];

// const OWNER = '0x1315B9510Cd7f75A63BB59bA7d9D1FAd083d0667';
const OWNER = '0xc46d3c9d93febdd5027c9b696fe576dc654c66de';
// const OWNER = '0xdcf4dbd159afc0fd71bcf1bfa97ccf23646eabc0';

const OWNER_IN = ['0xc46d3c9d93febdd5027c9b696fe576dc654c66de', '0xdcf4dbd159afc0fd71bcf1bfa97ccf23646eabc0'];

const GET_BALANCE = false; // retrieve gotchis balance (took pretty much time)
// ! the bigger the chunk size the faster the script will run but the more likely it will fail (also quantity of TOKENS affects it)
const BALANCE_CHUNK_SIZE = 20; // chunk size for retrieving balance requests
const TRANSACTION_CHUNK_SIZE = 20; // chunk size for batch requests
// ! BE CERAFUL with this one, it will finish rent for all gotchis
const FINISH_LENDING = false; // finish rent after claiming or not (true or false)
const EXECUTE = true; // execute transactions or not (true or false)

// borrower_not: "0x0000000000000000000000000000000000000000",
// borrower: "0x8ba922eb891a734f17b14e7ff8800e6626912e5d",
const lendingsQuery = `{
  gotchiLendings(
    first: 1000,
    skip: 720,
    orderBy: gotchiKinship,
    orderDir: desc,
    where:{
      lender_in: ${JSON.stringify(OWNER_IN)},
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
    const toClaim: any = [];

    console.log('sumonning', lendings.length, 'lendings');

    if (GET_BALANCE) {
      console.log('retriewing', lendings.length, 'gotchis balances');
      console.log('balance chank size', BALANCE_CHUNK_SIZE);

      const chunk = chunkArray(lendings, BALANCE_CHUNK_SIZE);
      let processed = 0;

      for (let i = 0; i < chunk.length; i++) {
        const promises = chunk[i].map((lending: any) => tokensPromises(lending.gotchi.escrow));

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
      lendings.forEach((lending: any) => {
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

    console.log('to claim', gotchiIds.length);

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
    if (gotchiIds.length > 0 && EXECUTE) {
      console.log('tx chank size', TRANSACTION_CHUNK_SIZE);
      const chunk = chunkArray(gotchiIds, TRANSACTION_CHUNK_SIZE);
      let processed = 0;

      // loop through chunks
      for (let i = 0; i < chunk.length; i++) {
        await MAIN_CONTRACT_WITH_SIGNER[FINISH_LENDING ? 'batchClaimAndEndGotchiLending' : 'batchClaimGotchiLending'](
          chunk[i],
          // { gasPrice: gasBoosted, gasLimit: 9000000 } // TODO: gas limit is required when you ending lending
          { gasPrice: gasBoosted, gasLimit: 10000000 }
        ).then(async (tx: ContractTransaction) => {
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
            .catch((error: any) => {
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
