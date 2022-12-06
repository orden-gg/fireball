import 'dotenv/config';

import axios from 'axios';
import { exit } from 'process';

// @ts-ignore
import { GRAPH_CORE_API } from '../../shared/constants/the-graph.constants.ts';
// @ts-ignore
import { HALF_DAY_MILLIS } from '../../shared/constants/date.constants.ts';
import {
    SCRIPT_WALLET_ADDRESS,
    CONSOLE_COLORS,
    MAIN_CONTRACT_WITH_SIGNER,
    getGasPrice,
    paint // @ts-ignore
} from './api/scripts.api.ts';
import { ContractTransaction, ethers } from 'ethers';

interface Gotchi {
    gotchiId: string;
    name: string;
    lastInteracted: string;
}

const { OWNER_ADDRESS, OPERATOR_PRIVATE_KEY } = process.env;

if (!OWNER_ADDRESS || !OPERATOR_PRIVATE_KEY) {
    console.log('Please specify OWNER_ADDRESS and OPERTOR_PRIVATE_KEY in .env');
    exit();
}

const currentUTC = Date.now();
const interactionWaypoint = parseInt(((currentUTC - HALF_DAY_MILLIS) / 1000).toString());
const petQuery = `{
    user(id: "${OWNER_ADDRESS.toLowerCase()}") {
        gotchisOriginalOwned(
            first: 1000,
            where: { lastInteracted_lte: "${interactionWaypoint}" })
        {
            gotchiId
            name
            lastInteracted
        }
    }
}`;

// ! check if operator is approved
MAIN_CONTRACT_WITH_SIGNER.isPetOperatorForAll(OWNER_ADDRESS, SCRIPT_WALLET_ADDRESS)
    .then((res: boolean) => {
        console.log(`👀 operator is approved: ${paint(res, CONSOLE_COLORS.Pink)}`);

        if (!res) {
            console.log(`${CONSOLE_COLORS.Red}terminated!${CONSOLE_COLORS.White}`);
            exit();
        }
    })
    .then(() => {
        // ! get all gotchis for petting
        axios
            .post(GRAPH_CORE_API, { query: petQuery })
            .then(async (res) => {
                const gotchis: Gotchi[] = res.data.data.user.gotchisOriginalOwned;
                const gotchiIds = gotchis.map((gotchi) => gotchi.gotchiId);
                const gasPriceGwei = await getGasPrice();
                const gasPrice = ethers.utils.formatUnits(gasPriceGwei, 'gwei');

                if (!gotchis.length) {
                    console.log(paint('No gotchis avaialble for petting!', CONSOLE_COLORS.Yellow));
                    exit();
                }

                console.log(`👻 gotchis for petting: ${paint(gotchis.length, CONSOLE_COLORS.Pink)}`);
                console.log(`🚀 gas price: ${paint(Number(gasPrice).toFixed(2), CONSOLE_COLORS.Pink)}`);

                // ! pet the gotchis
                MAIN_CONTRACT_WITH_SIGNER.interact(gotchiIds, {
                    gasPrice: gasPriceGwei
                }).then((tx: ContractTransaction) => {
                    console.log(`${paint('Tx sent!', CONSOLE_COLORS.Green)} https://polygonscan.com/tx/${tx.hash}`);

                    // ! wait for pet transaction to display result
                    tx.wait()
                        .then(() => {
                            console.log(paint('Folowing gotchis are happy:', CONSOLE_COLORS.Pink));
                            console.log(gotchis.map((gotchi) => `${gotchi.gotchiId}: ${gotchi.name}`));
                        })
                        .catch((error: any) =>
                            console.log(
                                `${paint('Tx failed!', CONSOLE_COLORS.Red)}, reason: ${error.reason}, ${error.code}`
                            )
                        );
                });
            })
            .catch((e) => console.log(e));
    });

console.log(`🧑 owner: ${paint(OWNER_ADDRESS, CONSOLE_COLORS.Cyan)}`);
console.log(`🧑 operator: ${paint(SCRIPT_WALLET_ADDRESS, CONSOLE_COLORS.Cyan)}`);
