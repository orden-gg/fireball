import axios from 'axios';
import 'dotenv/config';
import { ContractTransaction, ethers } from 'ethers';
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

const txCostLimit = 220 * 1e9;

const { OPERATOR_PRIVATE_KEY } = process.env;
const OWNER = '0xc46d3c9d93febdd5027c9b696fe576dc654c66de';
// ! retrieve gotchis balance (took pretty much time)
const GET_BALANCE = false;

const TOKENS = [FUD_CONTRACT, FOMO_CONTRACT, ALPHA_CONTRACT, KEK_CONTRACT, GHST_CONTRACT];
// TODO: method for token name
const TOKENS_NAME = ['fud', 'fomo', 'alpha', 'kek', 'ghst'];

// TODO: batch claim
// ! borrower_not: "0x0000000000000000000000000000000000000000",
// borrower: "0x8ba922eb891a734f17b14e7ff8800e6626912e5d",
const lendingsQuery = `{
  gotchiLendings(
    first: 50,
    skip: 50,
    orderBy: gotchiKinship,
    orderDir: desc,
    where:{
      lender: "${OWNER}",
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
    console.log('retrieve', lendings.length, 'lendings');

    if (GET_BALANCE) {
      console.log('retriewing', lendings.length, 'gotchis balances');
      const promises = lendings.map((lending: any) => tokensPromises(lending.gotchi.escrow));

      await Promise.all(promises).then((tokensResponse) => {
        tokensResponse.forEach((tokens, gotchiIndex) => {
          const modified = tokens.map(
            (amount, index) => ` ${TOKENS_NAME[index]}: ${paint(amount, CONSOLE_COLORS.Cyan)} `
          );
          console.log(
            'gotchi',
            paint(lendings[gotchiIndex].gotchiTokenId, CONSOLE_COLORS.Pink),
            `(kin: ${lendings[gotchiIndex].gotchiKinship})`,
            '=>',
            modified.toString()
          );

          // TODO: hardcoded for only 1st token!
          if (tokens[0] > 0) {
            toClaim.push({ id: lendings[gotchiIndex].gotchiTokenId, ghst: tokens[0] });
          }
        });
      });
    }

    const gasPriceGwei = await getGasPrice();
    const gasPrice = ethers.utils.formatUnits(gasPriceGwei, 'gwei');
    // const gotchiIds = toClaim.map((gotchi) => gotchi.id);
    const gotchiIds = lendings.map((gotchi) => gotchi.gotchiTokenId);

    // const gasBoost = ethers.utils.parseUnits('25', 'gwei');
    // const gasBoosted = BigNumber.from(gasPriceGwei).add(gasBoost);

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

    // ! batchClaimGotchiLending
    MAIN_CONTRACT_WITH_SIGNER.batchClaimGotchiLending(gotchiIds, { gasPrice: gasPriceGwei }).then(
      async (tx: ContractTransaction) => {
        console.log(`${paint('Tx sent!', CONSOLE_COLORS.Green)} https://polygonscan.com/tx/${tx.hash}`);
        console.log('waiting Tx approval...');

        // ! wait for pet transaction to display result
        await tx
          .wait()
          .then(() => {
            console.log(paint('Happy folks:', CONSOLE_COLORS.Pink), lendings.length);
            console.log(lendings.map((lending) => `lendingId: ${lending.id}, gotchi: ${lending.gotchiTokenId}`));

            return true;
          })
          .catch((error: any) => {
            console.log(`${paint('Tx failed!', CONSOLE_COLORS.Red)}, reason: ${error.reason}, ${error.code}`);

            return false;
          });
      }
    );

    // !batchClaimAndEndGotchiLending
    // MAIN_CONTRACT_WITH_SIGNER.batchClaimAndEndGotchiLending(gotchiIds, {
    //   gasPrice: gasBoosted
    //   // gasLimit: 4000000
    // }).then(async (tx: ContractTransaction) => {
    //   console.log(`${paint('Tx sent!', CONSOLE_COLORS.Green)} https://polygonscan.com/tx/${tx.hash}`);
    //   console.log('waiting Tx approval...');

    //   // ! wait for pet transaction to display result
    //   await tx
    //     .wait()
    //     .then(() => {
    //       console.log(paint('Happy folks:', CONSOLE_COLORS.Pink), toClaim.length);
    //       console.log(toClaim.map((claim) => `id: ${claim.id}, ghst: ${claim.ghst}`));
    //       return true;
    //     })
    //     .catch((error: any) => {
    //       console.log(`${paint('Tx failed!', CONSOLE_COLORS.Red)}, reason: ${error.reason}, ${error.code}`);
    //       return false;
    //     });
    // });
  });
};

claim();

const tokensPromises = async (address: string) => {
  const promises = TOKENS.map(async (token: string) =>
    TOKEN_CONTRACT_WITH_SIGNER(token)
      .balanceOf(address)
      .then((amount: any) => Number(ethers.utils.formatUnits(amount)).toFixed(1))
  );

  return await Promise.all(promises);
};
