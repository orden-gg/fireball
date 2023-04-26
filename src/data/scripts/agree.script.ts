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
  getGasPrice,
  paint // @ts-ignore
} from './api/scripts.api.ts';

// @ts-ignore
import { GRAPH_CORE_API } from '../../shared/constants/the-graph.constants.ts';

// tx cost limit
const txCostLimit = 220 * 1e9;

const { OPERATOR_PRIVATE_KEY } = process.env;

const WHITELIST = 6329;

// TODO: batch claim
const lendingsQuery = `{
  gotchiLendings(
    first: 10,
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
          txCostLimit.toString(),
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
        { gasPrice: gasBoosted, gasLimit: 2000000, nonce: nonce + index }
      )
    );

    Promise.all(promises).then(async (txsRes: ContractTransaction[]) => {
      for (const [index, tx] of txsRes.entries()) {
        console.log(`${paint('Tx sent!', CONSOLE_COLORS.Green)} https://polygonscan.com/tx/${tx.hash}`);

        tx.wait()
          .then(() =>
            console.log(
              paint('=>', CONSOLE_COLORS.Green),
              paint(lendings[index].gotchiTokenId, CONSOLE_COLORS.Pink),
              paint('transaction confirmed!', CONSOLE_COLORS.Green)
            )
          )
          .catch(() =>
            console.log(
              paint('=>', CONSOLE_COLORS.Red),
              paint(lendings[index].gotchiTokenId, CONSOLE_COLORS.Pink),
              paint('transaction failed :(', CONSOLE_COLORS.Red)
            )
          );
      }
    });
  });
};

agree();
