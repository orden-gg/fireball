import axios from 'axios';
import 'dotenv/config';
import { exit } from 'process';

// @ts-ignore
import {
  CONSOLE_COLORS,
  SCRIPT_BORROWER_WALLET_ADDRESS,
  paint // @ts-ignore
} from './api/scripts.api.js';

// @ts-ignore
import { GRAPH_CORE_API } from '../../shared/constants/the-graph.constants.js';

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
const MAX_BORROWED = 150;
const MAX_KINSHIP = 2000;
const MIN_KINSHIP = 1;
const FARMER_1 = '0xdcf4dbd159afc0fd71bcf1bfa97ccf23646eabc0';
// Interval repeater and tx cost limit

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
  gotchiLendings (first: 1000 where: {whitelist: "${whitelistID}" } orderDirection: desc, orderBy: id) {
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
            o.owner.toLocaleLowerCase() === o.originalOwner.toLocaleLowerCase() &&
            !o.borrower &&
            o.lender &&
            o.kinship > MIN_KINSHIP &&
            o.kinship < MAX_KINSHIP && //&& o.splitBorrower > 10
            o.originalOwner.toLocaleLowerCase() === FARMER_1.toLocaleLowerCase()
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

            console.log(`waiting Tx approval... Listings: ${borrowId.listingId}`);
            clearInterval(interval);

            console.log(
              `${paint('Happy folks:', CONSOLE_COLORS.Pink)} are borrow ready: Name ${paint(
                borrowId.name,
                CONSOLE_COLORS.Green
              )} kin: ${paint(borrowId.kinship, CONSOLE_COLORS.Pink)} , GotchiId ${paint(
                borrowId.gotchiId,
                CONSOLE_COLORS.Green
              )} from ${paint(`whitelist:${whitelistID}`, CONSOLE_COLORS.Green)}`
            );
            totalBorrowedTemp += 1;
            console.log(
              `🚀 Borrow ready from: ${paint(borrowId.originalOwner, CONSOLE_COLORS.Pink)} , index in row ${paint(
                totalBorrowedTemp,
                CONSOLE_COLORS.Pink
              )}`
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
