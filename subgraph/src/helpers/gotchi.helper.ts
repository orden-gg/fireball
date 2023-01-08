import { BigInt } from '@graphprotocol/graph-ts';
import { Gotchi } from '../../generated/schema';

export const loadOrCreateGotchi = (gotchiId: BigInt): Gotchi => {
    let gotchi = Gotchi.load(gotchiId.toString());

    if (!gotchi) {
        gotchi = new Gotchi(gotchiId.toString());
    }
    return gotchi;
};
