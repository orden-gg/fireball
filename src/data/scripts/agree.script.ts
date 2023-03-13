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
  SCRIPT_WALLET_NONCE,
  TOKEN_CONTRACT_WITH_SIGNER,
  getGasPrice,
  paint // @ts-ignore
} from './api/scripts.api.ts';

// @ts-ignore
import { HALF_DAY_MILLIS } from '../../shared/constants/date.constants.ts';
// @ts-ignore
import { GRAPH_CORE_API } from '../../shared/constants/the-graph.constants.ts';

interface Gotchi {
  gotchiId: string;
  name: string;
  lastInteracted: string;
}
// Interval repeater and tx cost limit
const repeatTimer = 5 * 60 * 1000;
const txCostLimit = 220 * 1e9;

const OWNER = '0x1315B9510Cd7f75A63BB59bA7d9D1FAd083d0667';
const { OPERATOR_PRIVATE_KEY } = process.env;

const WHITELIST = 6329;

// TODO: batch claim
const lendingsQuery = `{
  gotchiLendings(
    first: 25,
    orderBy: gotchiKinship,
    orderDir: desc,
    where:{
      whitelistId: ${WHITELIST}
      cancelled: false,
      completed: false,
      timeAgreed: null
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

    console.log('agree', lendings.length, 'lendings');

    const gasPriceGwei = await getGasPrice();
    const gasPrice = ethers.utils.formatUnits(gasPriceGwei, 'gwei');
    const gasBoost = ethers.utils.parseUnits('25', 'gwei');
    const gasBoosted = BigNumber.from(gasPriceGwei).add(gasBoost);

    const nonce = await SCRIPT_WALLET_NONCE();

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
    console.log(`🗞  current nonce: ${paint(nonce, CONSOLE_COLORS.Pink)}`);

    const promises = lendings.map((lending, index) =>
      MAIN_CONTRACT_WITH_SIGNER.agreeGotchiLending(
        lending.id,
        lending.gotchiTokenId,
        lending.upfrontCost,
        lending.period,
        [lending.splitOwner, lending.splitBorrower, lending.splitOther],
        { gasPrice: gasBoosted, gasLimit: 600000, nonce: nonce + index }
      )
    );

    Promise.all(promises).then(async (txsRes: ContractTransaction[]) => {
      for (let [index, tx] of txsRes.entries()) {
        console.log(`${paint('Tx sent!', CONSOLE_COLORS.Green)} https://polygonscan.com/tx/${tx.hash}`);

        tx.wait()
          .then((res: any) =>
            console.log(
              paint('=>', CONSOLE_COLORS.Green),
              paint(lendings[index].gotchiTokenId, CONSOLE_COLORS.Pink),
              paint('transaction confirmed!', CONSOLE_COLORS.Green)
            )
          )
          .catch((error: any) =>
            console.log(
              paint('=>', CONSOLE_COLORS.Red),
              paint(lendings[index].gotchiTokenId, CONSOLE_COLORS.Pink),
              paint('transaction failed :(', CONSOLE_COLORS.Red)
            )
          );
      }
    });
  });

  // for (const user of PET_ADDRESSES) {
  //   const { name, address } = user;
  //   const collectedGotchis = await collectIds(name, address);

  //   if (collectedGotchis.length) {
  //     gotchis.push(...collectedGotchis);
  //   }
  // }

  // if (!gotchis.length) {
  //   console.log(paint('No gotchis avaialble for petting!', CONSOLE_COLORS.Yellow));
  //   console.log('next pet in', repeatTimer / 60000, 'minutes');

  //   return false;
  // }

  // const gasPriceGwei = await getGasPrice();

  // if (gasPriceGwei >= txCostLimit) {
  //   console.log(
  //     `💱 ${paint('to high tx cost: maximum', CONSOLE_COLORS.Red)} ${paint(
  //       txCostLimit,
  //       CONSOLE_COLORS.Red
  //     )} current ${paint(gasPriceGwei, CONSOLE_COLORS.Pink)}`
  //   );
  //   console.log('next pet in', repeatTimer / 60000, 'minutes');

  //   return false;
  // }

  // console.log(`💱 tx cost: maximum - ${txCostLimit} current - ${paint(gasPriceGwei, CONSOLE_COLORS.Pink)}`);

  // const gasPrice = ethers.utils.formatUnits(gasPriceGwei, 'gwei');
  // const gotchiIds = gotchis.map((gotchi) => gotchi.gotchiId);

  // console.log(`👻 petting: ${paint(gotchis.length, CONSOLE_COLORS.Pink)}`);
  // console.log(`🚀 gas price: ${paint(Number(gasPrice).toFixed(2), CONSOLE_COLORS.Pink)}`);

  // await MAIN_CONTRACT_WITH_SIGNER.interact(gotchiIds, {
  //   gasPrice: gasPriceGwei
  // }).then(async (tx: ContractTransaction) => {
  //   console.log(`${paint('Tx sent!', CONSOLE_COLORS.Green)} https://polygonscan.com/tx/${tx.hash}`);
  //   console.log('waiting Tx approval...');

  //   // ! wait for pet transaction to display result
  //   await tx
  //     .wait()
  //     .then(() => {
  //       console.log(paint('Happy folks:', CONSOLE_COLORS.Pink), gotchis.length);
  //       console.log(gotchis.map((gotchi) => `${gotchi.gotchiId}: ${gotchi.name}`));
  //       console.log('next pet in', repeatTimer / 60000, 'minutes');
  //       return true;
  //     })
  //     .catch((error: any) => {
  //       console.log(`${paint('Tx failed!', CONSOLE_COLORS.Red)}, reason: ${error.reason}, ${error.code}`);
  //       console.log('next pet in', repeatTimer / 60000, 'minutes');
  //       return false;
  //     });
  // });
};

agree();
