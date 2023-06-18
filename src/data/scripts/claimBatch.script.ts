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
  //getLatestBlock
} from './api/scripts.api.js';
import { ContractTransaction, ethers } from 'ethers';

interface Gotchi {
  listingId: string;
  gotchiId: string;
  name: string;
  owner: string;
  originalOwner: string;
  claimBatcher: string;
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
const MAX_CLAIMED = 30;
const MAX_KINSHIP = 1999;
const MIN_KINSHIP = 350;
// Interval repeater and tx cost limit
const repeatTimer = 1 * 15 * 1000;
const txCostLimit = 175 * 1e9;
let interval;
let totalclaimBatchedTemp = 0;
function onlyWhitelistedMember(axios, CONSOLE_COLORS, paint) {
  // Check if QUEST_ADDRESS is part of .env
  if (!SCRIPT_BORROWER_WALLET_ADDRESS) {
    console.log('Please specify claimBatchER PK in .env');
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

function claimBatchGotchis(axios, CONSOLE_COLORS, paint) {
  const claimBatchQuery = `{ 
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
  axios
    .post(GRAPH_CORE_API, { query: claimBatchQuery })
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
          gotchisPush.claimBatcher = gotchiLendings[i].claimBatcher;
          gotchisPush.lender = gotchiLendings[i].lender;
          gotchisPush.splitOwner = gotchiLendings[i].splitOwner;
          gotchisPush.splitBorrower = gotchiLendings[i].splitBorrower;
          gotchisPush.splitOther = gotchiLendings[i].splitOther;
          gotchisPush.period = gotchiLendings[i].period;
          gotchisPush.kinship = gotchiLendings[i].gotchi.kinship;

          //gotchisPush.listing =  gotchiLendings[i].gotchi.listings;
          gotchis.push(gotchisPush);
        }
        // filter to search owner as claimBatcher address

        const gotchisFiltred = gotchis.filter(
          (o) =>
            o.owner === SCRIPT_BORROWER_WALLET_ADDRESS && o.lender && o.kinship > MIN_KINSHIP && o.kinship < MAX_KINSHIP
        );
        //debugger;// distinct and sort result of search
        const distinctgotchis = Array.from(
          new Set([...new Map(gotchisFiltred.map((item) => [item['gotchiId'], item])).values()])
        ).sort((a, b) => b.kinship - a.kinship); // desc for now , for asc a.kinship - b.kinship

        if (distinctgotchis.length < 1) {
          console.log(
            `${paint('No gotchis available for claimBatch in whitelist: ', CONSOLE_COLORS.Yellow)} ${whitelistID}`
          );
          exit();
        }
        if (distinctgotchis.length > 0) {
          // run contract to claimBatch
          // gas price check

          if (totalclaimBatchedTemp >= MAX_CLAIMED) {
            console.log(`🚀 Max claimed achieved: ${paint(totalclaimBatchedTemp, CONSOLE_COLORS.Pink)}`);
            totalclaimBatchedTemp = 0;

            return;
          }

          const gasPriceGwei = Number(await getGasPrice());

          if (gasPriceGwei >= txCostLimit) {
            console.log(
              `💱 ${paint('to high tx cost: maximum', CONSOLE_COLORS.Red)} ${paint(
                txCostLimit,
                CONSOLE_COLORS.Red
              )} current ${paint(gasPriceGwei, CONSOLE_COLORS.Pink)}`
            );
            clearInterval(interval);
            interval = setInterval(claimBatch, repeatTimer);
            console.log(`⌛ Next timer in minutes: ${paint(repeatTimer / 60 / 1000, CONSOLE_COLORS.Green)}`);

            return;
          }
          clearInterval(interval);
          console.log(`💱 tx cost: maximum - ${txCostLimit} current - ${paint(gasPriceGwei, CONSOLE_COLORS.Pink)}`);
          const gasPrice = ethers.utils.formatUnits(gasPriceGwei, 'gwei');

          const distinctgotchisIds = distinctgotchis.map((item) => item.gotchiId);
          const gasLimit = 35 * gasPriceGwei;
          //const block = await getLatestBlock();
          //let block_number = block.number;
          //let base_fee = parseFloat(ethers.utils.formatUnits(block.baseFeePerGas, 'gwei'));

          await MAIN_CONTRACT_WITH_BORROWER.batchClaimGotchiLending(distinctgotchisIds, {
            gasPrice: gasLimit,
            gasLimit: txCostLimit
          })
            .then(async (tx: ContractTransaction) => {
              console.log(`${paint('Tx sent!', CONSOLE_COLORS.Green)} https://polygonscan.com/tx/${tx.hash}`);
              console.log(`waiting Tx approval... Listings: ${distinctgotchisIds}`);
              clearInterval(interval);
              // ! wait for claimBatch transaction to display result
              await tx.wait().then(() => {
                console.log(
                  `${paint('Happy folks:', CONSOLE_COLORS.Pink)} was claimBatched: ${paint(
                    distinctgotchisIds,
                    CONSOLE_COLORS.Green
                  )} from ${paint(`whitelist:${whitelistID}`, CONSOLE_COLORS.Green)}`
                );
                totalclaimBatchedTemp += 1;
                console.log(`🚀 claimBatched achieved: ${paint(totalclaimBatchedTemp, CONSOLE_COLORS.Pink)}`);
              });
              console.log(`🚀 gas price: ${paint(Number(gasPrice).toFixed(2), CONSOLE_COLORS.Pink)}`);
            })
            .catch((error) =>
              console.log(`${paint('Tx failed!', CONSOLE_COLORS.Red)}, reason: ${error.reason}, ${error.code}`)
            );
        }
      }
    })
    .catch((e) => console.log(e));
}

claimBatch();

function claimBatch() {
  onlyWhitelistedMember(axios, CONSOLE_COLORS, paint);
  claimBatchGotchis(axios, CONSOLE_COLORS, paint);
}
