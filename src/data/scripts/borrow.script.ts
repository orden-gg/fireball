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
  getGasPrice,
  paint // @ts-ignore
} from './api/scripts.api.js';
import { ContractTransaction, ethers } from 'ethers';

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
// Whitelist hardcoded id "717" 6110
const whitelistID = '717';
const MAX_BORROWED = 8;
const MAX_KINSHIP = 1500;
const MIN_KINSHIP = 1000;
// Interval repeater and tx cost limit
const repeatTimer = 1 * 15 * 1000;
const txCostLimit = 175 * 1e9;

let interval;
let totalBorrowedTemp = 0;
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
  const borrowQuery = `{ 
  gotchiLendings (first: 200 where: {whitelist: "${whitelistID}" } orderDirection: desc, orderBy: id) {
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
  axios
    .post(GRAPH_CORE_API, { query: borrowQuery })
    .then(async (res) => {
      // read all gotchis from whitelist = whitelistID
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

          //gotchisPush.listing =  gotchiLendings[i].gotchi.listings;
          gotchis.push(gotchisPush);
        }
        // filter to search borrower = null && o.lender
        //debugger;
        const gotchisFiltred = gotchis.filter(
          (o) =>
            o.owner.toLocaleLowerCase() === o.originalOwner.toLocaleLowerCase() && o.originalOwner.toLocaleLowerCase() === '0xdcf4dbd159afc0fd71bcf1bfa97ccf23646eabc0' && !o.borrower && o.lender && o.kinship > MIN_KINSHIP && o.kinship < MAX_KINSHIP
        );
        //debugger;// distinct and sort result of search
        const distinctgotchis = [...new Map(gotchisFiltred.map((item) => [item['gotchiId'], item])).values()].sort(
          (a, b) => b.kinship - a.kinship
        ); // desc for now , for asc a.kinship - b.kinship
        //debugger;
        if (!distinctgotchis.length) {
          console.log(
            `${paint('No gotchis available for borrow in whitelist: ', CONSOLE_COLORS.Yellow)} ${whitelistID}`
          );
          exit();
        }
        if (distinctgotchis) {
          for (const borrowId of distinctgotchis) {
            // run contract to agreeGotchiLending
            // gas price check

            if (totalBorrowedTemp >= MAX_BORROWED) {
              console.log(`🚀 Max borrowed achieved: ${paint(totalBorrowedTemp, CONSOLE_COLORS.Pink)}`);
              totalBorrowedTemp = 0;

              return;
            }

            const gasPriceGwei = await getGasPrice();

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
            console.log(`💱 tx cost: maximum - ${txCostLimit} current - ${paint(gasPriceGwei, CONSOLE_COLORS.Pink)}`);
            const gasPrice = ethers.utils.formatUnits(gasPriceGwei, 'gwei');

            await MAIN_CONTRACT_WITH_BORROWER.agreeGotchiLending(
              borrowId.listingId,
              borrowId.gotchiId,
              0,
              borrowId.period,
              [borrowId.splitOwner, borrowId.splitBorrower, borrowId.splitOther],
              {
                gasPrice: gasPriceGwei,
                gasLimit: 15e5
              }
            )
              .then(async (tx: ContractTransaction) => {
                console.log(`${paint('Tx sent!', CONSOLE_COLORS.Green)} https://polygonscan.com/tx/${tx.hash}`);
                console.log(`waiting Tx approval... Listings: ${borrowId.listingId}`);
                clearInterval(interval);
                // ! wait for borrow transaction to display result
                await tx.wait().then(() => {
                  console.log(
                    `${paint('Happy folks:', CONSOLE_COLORS.Pink)} was borrowed: ${paint(borrowId.name,
                      CONSOLE_COLORS.Green
                    )} ${paint(borrowId.gotchiId,
                      CONSOLE_COLORS.Green
                    )} from ${paint(`whitelist:${whitelistID}`, CONSOLE_COLORS.Green)}`
                  );
                  totalBorrowedTemp += 1;
                  console.log(`🚀 Borrowed achieved: ${paint(totalBorrowedTemp, CONSOLE_COLORS.Pink)}`);
                });
                console.log(`🚀 gas price: ${paint(Number(gasPrice).toFixed(2), CONSOLE_COLORS.Pink)}`);
              })
              .catch((error) =>
                console.log(`${paint('Tx failed!', CONSOLE_COLORS.Red)}, reason: ${error.reason}, ${error.code}`)
              );
          }
        }
      }
    })
    .catch((e) => console.log(e));
}

borrow();

function borrow() {
  onlyWhitelistedMember(axios, CONSOLE_COLORS, paint);
  borrowGotchis(axios, CONSOLE_COLORS, paint);
}
