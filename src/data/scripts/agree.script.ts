import axios from 'axios';
import 'dotenv/config';
import { BigNumber, ContractTransaction, ethers } from 'ethers';
import { exit } from 'process';

// @ts-ignore
import {
  CONSOLE_COLORS,
  MAIN_CONTRACT_WITH_SIGNER,
  SCRIPT_WALLET_ADDRESS,
  SCRIPT_WALLET_NONCE,
  SETTINGS,
  TX_COST_LIMIT,
  chunkArray,
  delay,
  getGasPrice,
  paint // @ts-ignore
} from './api/scripts.api.ts';

// @ts-ignore
import { GRAPH_CORE_API } from '../../shared/constants/the-graph.constants.ts';

const { OPERATOR_PRIVATE_KEY } = process.env;

// TODO: batch claim
const lendingsQuery = `{
  gotchiLendings(
    first: 1000,
    orderBy: gotchiKinship,
    orderDir: desc,
    where:{
      whitelistId: ${SETTINGS.WHITELIST}
      cancelled: false,
      completed: false,
      timeAgreed: null,
      ${
        SETTINGS.HARDCODED_IDS && SETTINGS.HARDCODED_IDS.length > 0
          ? `gotchiTokenId_in: [${SETTINGS.HARDCODED_IDS}],`
          : ''
      }
    }
  ) {
    id
    gotchiTokenId
    gotchiKinship
    whitelistId
    upfrontCost
    period
    splitOwner
    splitBorrower
    splitOther
  }
}`;

console.log(`🧑 operator: ${paint(SCRIPT_WALLET_ADDRESS, CONSOLE_COLORS.Pink)}`);

if (SETTINGS.HARDCODED_IDS && SETTINGS.HARDCODED_IDS.length) {
  console.log(paint(`BEWARE => using ${SETTINGS.HARDCODED_IDS.length} hardcoded gotchi ids`, CONSOLE_COLORS.Red));
}

const agree = async () => {
  if (!OPERATOR_PRIVATE_KEY) {
    console.log('Please specify OPERTOR_PRIVATE_KEY in .env');
    exit();
  }

  return await axios.post(GRAPH_CORE_API, { query: lendingsQuery }).then(async (response) => {
    if (response.data.errors) {
      console.log(paint('error!', CONSOLE_COLORS.Red), response.data.errors);
    }

    const lendings = response.data.data.gotchiLendings;

    console.log('to agree', lendings.length, 'lendings');

    if (lendings.length === 0) {
      console.log(paint(`no gotchis with whitelist ${SETTINGS.WHITELIST} to agree  :(`, CONSOLE_COLORS.Red));
    }

    if (lendings.length > 0) {
      const gasPriceGwei = await getGasPrice();
      const gasPrice = ethers.utils.formatUnits(gasPriceGwei, 'gwei');
      const gasBoost = ethers.utils.parseUnits('25', 'gwei');
      const gasBoosted = BigNumber.from(gasPriceGwei).add(gasBoost);

      const nonce = await SCRIPT_WALLET_NONCE();

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
      console.log(`🗞  current nonce: ${paint(nonce, CONSOLE_COLORS.Pink)}`);

      console.log('tx chank size', SETTINGS.TRANSACTION_CHUNK_SIZE);
      const chunk = chunkArray(lendings, SETTINGS.TRANSACTION_CHUNK_SIZE);

      let txNonce = nonce - 1; // hacky way to prepare nonce number for txs iteration
      let processed = 0;

      // loop through chunks
      for (let i = 0; i < chunk.length; i++) {
        const promises = chunk[i].map((lending) => {
          txNonce++;

          return MAIN_CONTRACT_WITH_SIGNER.agreeGotchiLending(
            lending.id,
            lending.gotchiTokenId,
            lending.upfrontCost,
            lending.period,
            [lending.splitOwner, lending.splitBorrower, lending.splitOther],
            { gasPrice: gasBoosted, gasLimit: 2000000, nonce: txNonce }
          );
        });

        processed += chunk[i].length;

        await Promise.all(promises).then(async (txsRes: ContractTransaction[]) => {
          for (const [index, tx] of txsRes.entries()) {
            console.log(`${paint('Tx sent!', CONSOLE_COLORS.Green)} https://polygonscan.com/tx/${tx.hash}`);
          }

          console.log('done', processed, 'of', lendings.length);

          if (processed !== lendings.length) {
            await delay(7);
          }
        });
      }
    }
  });
};

agree();
