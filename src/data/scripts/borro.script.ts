import 'dotenv/config';

import axios from 'axios';
import { exit } from 'process';

// @ts-ignore
import { GRAPH_CORE_API } from '../../shared/constants/the-graph.constants.js';
// @ts-ignore
import {
  SCRIPT_BORROWER_WALLET_ADDRESS,
  CONSOLE_COLORS,
  MAIN_CONTRACT_WITH_BORROWER,
  getNonceBorrower,
  getGasPrice,
  paint //, // @ts-ignore
  //provider
} from './api/scripts.api.js';
//import { ethers } from 'ethers';

//import { ethers } from 'ethers';

interface Gotchi {
  listingId: string;
  gotchiId: string;
  name: string;
  owner: string;
  originalOwner: string;
  borrower: string;
  lender: string;
  splitOwner: number;
  splitBorrower: number;
  splitOther: number;
  period: number;
  kinship: number;
  listing: number;
}

interface BorrowList {
  [key: string]: CustomAny;
}

interface BorrowedList {
  name: string;
  id: string;
}
//list: string[];
// Whitelist hardcoded id "717" 6110
const whitelistID = '717';
const MAX_BORROWED = 15;
const MAX_KINSHIP = 1500;
const MIN_KINSHIP = 2;
// Interval repeater and tx cost limit
const repeatTimer = 1 * 15 * 1000;
const txCostLimit = 155 * 1e9;
let interval;
//const MAX_NONCE = 62;

function onlyWhitelistedMember(axios, CONSOLE_COLORS, paint) {
  // Check if QUEST_ADDRESS is part of .env
  if (!SCRIPT_BORROWER_WALLET_ADDRESS) {
    console.log('Please specify BORROWER PK in .env');
    exit();
  }
  // Check if owner is part of whitelist members
  const whitelistQuery = `{ 
    whitelist (id: "${whitelistID}") {
    members
    ownerAddress
    }
}`;

  axios
    .post(GRAPH_CORE_API, { query: whitelistQuery })
    .then(async (res) => {
      const membersIds = res.data.data.whitelist.members;
      if (!membersIds.includes(SCRIPT_BORROWER_WALLET_ADDRESS.toLowerCase())) {
        console.log(`BORROWER_ADDRESS is not a part of ${paint(`whitelisted in:${whitelistID}`, CONSOLE_COLORS.Red)}`);
        exit();
      } else if (membersIds.includes(SCRIPT_BORROWER_WALLET_ADDRESS.toLowerCase())) {
        console.log(`BORROWER_ADDRESS is a part of ${paint(`whitelisted in:${whitelistID}`, CONSOLE_COLORS.Green)}`);
      }
    })
    .catch((e) => console.log(e));
}

function borrowGotchis(axios, CONSOLE_COLORS, paint) {
  // graph querry to read gotchis from lending whitelist
  const borrowQuery = `{ 
  gotchiLendings (first: 1000 where: {whitelist: "${whitelistID}"} orderDirection: desc, orderBy: id) {
    id
    whitelist {
      ownerAddress
    }
    borrower
    lender
    splitOwner
    splitBorrower
    splitOther
    period 
    gotchi {
      id
      name 
      owner {
        id
      }
      originalOwner {
        id
      }
      kinship
      listings{
        id
      }
    } 
  }
}`;
  axios.post(GRAPH_CORE_API, { query: borrowQuery }).then(async (res) => {
    // fetch all gotchis from graph result
    const gotchiLendings = res.data.data.gotchiLendings;
    const gotchis: Gotchi[] = [];
    if (gotchiLendings.length !== 0) {
      for (let i = 0; i < gotchiLendings.length; i++) {
        const gotchisPush = {} as Gotchi;
        gotchisPush.listingId = gotchiLendings[i].id;
        gotchisPush.gotchiId = gotchiLendings[i].gotchi.id;
        gotchisPush.name = gotchiLendings[i].gotchi.name;
        gotchisPush.owner = gotchiLendings[i].gotchi.owner.id;
        gotchisPush.originalOwner = gotchiLendings[i].gotchi.originalOwner.id;
        gotchisPush.borrower = gotchiLendings[i].borrower;
        gotchisPush.lender = gotchiLendings[i].lender;
        gotchisPush.splitOwner = gotchiLendings[i].splitOwner;
        gotchisPush.splitBorrower = gotchiLendings[i].splitBorrower;
        gotchisPush.splitOther = gotchiLendings[i].splitOther;
        gotchisPush.period = gotchiLendings[i].period;
        gotchisPush.kinship = gotchiLendings[i].gotchi.kinship;
        gotchis.push(gotchisPush);
      }
      // filter to search borrower = null && o.lender and kinship limitation
      const gotchisFiltred = gotchis.filter(
        (g) =>
          g.owner === g.originalOwner &&
          !g.borrower &&
          g.lender === g.owner &&
          g.kinship > MIN_KINSHIP &&
          g.kinship < MAX_KINSHIP
      );
      // distinct and sort result of search
      //debugger;
      const distinctGotchis = [...new Map(gotchisFiltred.map((item) => [item['gotchiId'], item])).values()].sort(
        (a, b) => Number(b.listingId) - Number(a.listingId)
      ); // desc for now , for asc a.kinship - b.kinship
      if (!distinctGotchis.length) {
        console.log(`${paint('No gotchis available for borrow in whitelist: ', CONSOLE_COLORS.Yellow)} ${whitelistID}`);
        exit();
      }
      if (distinctGotchis) {
        let i = 0;
        const borrowList: BorrowList[] = [];
        const borrowedList: BorrowedList[] = [];
        distinctGotchis.length = MAX_BORROWED;

        // const getGasLimit = await provider.estimateGas(borrowList).then((gasLimit) => {
        //   return Number(gasLimit) * 25;
        // });

        //console.log(Number(getGasLimit));
        // LOOP FOR SELECTED GOTCHIS
        for (const borrowId of distinctGotchis) {
          // Max borrowed check
          const nonce = await getNonceBorrower();
          const gasPriceGwei = await getGasPrice();
          // gas priceGwei check if over limit delay applied
          if (Number(gasPriceGwei) >= txCostLimit) {
            console.log(
              `💱 ${paint('to high tx cost: maximum', CONSOLE_COLORS.Red)} ${paint(
                txCostLimit,
                CONSOLE_COLORS.Red
              )} current ${paint(gasPriceGwei, CONSOLE_COLORS.Pink)}`
            );
            clearInterval(interval);
            interval = setInterval(borrow, repeatTimer);
            console.log(`⌛ Next timer in minutes: ${paint(repeatTimer / 60 / 1000, CONSOLE_COLORS.Green)}`);

            return;
          }
          clearInterval(interval);
          //console.log(`💱 tx cost: maximum - ${txCostLimit} current - ${paint(gasPriceGwei, CONSOLE_COLORS.Pink)}`);
          // gasPrice conversion
          //const gasPrice = ethers.utils.formatUnits(gasPriceGwei, 'gwei');
          //console.log(gasPrice);
          // nonce check

          // max nonce check
          // if (nonce >= MAX_NONCE) {
          //   console.log(
          //     `💱 ${paint('to high tx noce: maximum', CONSOLE_COLORS.Red)} ${paint(
          //       MAX_NONCE,
          //       CONSOLE_COLORS.Red
          //     )} current ${paint(nonce, CONSOLE_COLORS.Pink)}`
          //   );
          //   clearInterval(interval);
          //   interval = setInterval(borrow, repeatTimer);
          //   console.log(`⌛ Next timer in minutes: ${paint(repeatTimer / 60 / 1000, CONSOLE_COLORS.Green)}`);

          //   return;
          // }
          // preparing tx agreeGotchiLending for nonce
          //debugger;

          const tempTx = MAIN_CONTRACT_WITH_BORROWER.agreeGotchiLending(
            borrowId.listingId,
            borrowId.gotchiId,
            0,
            borrowId.period,
            [borrowId.splitOwner, borrowId.splitBorrower, borrowId.splitOther],
            {
              gasPrice: gasPriceGwei,
              gasLimit: 6 * 1e5,
              nonce: nonce + i
            }
          );

          borrowList.push(tempTx);

          const borrowedListPush = {} as BorrowedList;
          borrowedListPush.name = borrowId.name;
          borrowedListPush.id = borrowId.gotchiId;
          borrowedList.push(borrowedListPush);
          i += 1;
        }

        console.log(`MinKin: ${MIN_KINSHIP} MaxKin:  ${MAX_KINSHIP}`);
        console.log(borrowedList);
        await Promise.all(borrowList).then((txsRes) => {
          for (const tx of txsRes) {
            console.log(`transaction sent! ${paint(`https://polygonscan.com/tx/${tx.hash}`, CONSOLE_COLORS.Light)}`);
            console.log(
              `🚀 gas price: LIMIT ${paint(Number(tx.gasLimit), CONSOLE_COLORS.Pink)} maxfee ${paint(
                Number(tx.maxFeePerGas),
                CONSOLE_COLORS.Pink
              )}`
            );
          }

          txsRes[borrowList.length - 1]
            .wait()
            .then((_res: CustomAny) => {
              console.log(paint('=>', CONSOLE_COLORS.Green), paint('transaction confirmed!', CONSOLE_COLORS.Green));
              console.log(
                `${paint('Happy folks:', CONSOLE_COLORS.Pink)} was borrowed: ${paint(
                  borrowedList.length,
                  CONSOLE_COLORS.Green
                )} from ${paint(`whitelist:${whitelistID}`, CONSOLE_COLORS.Green)}`
              );
            })
            .catch((error: CustomAny) =>
              console.log(`${paint('Tx failed!', CONSOLE_COLORS.Red)}, reason: ${error.reason}, ${error.code}`)
            );
        });
      }
    }
  });
}

// main function
borrow();

function borrow() {
  // check if member is part of whitelist
  onlyWhitelistedMember(axios, CONSOLE_COLORS, paint);
  // borrow selected gotchis
  borrowGotchis(axios, CONSOLE_COLORS, paint);
}
