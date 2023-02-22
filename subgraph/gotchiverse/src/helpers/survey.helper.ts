import { Address, BigInt } from '@graphprotocol/graph-ts';

import { Survey } from '../../generated/schema';

export function loadOrCreateSurvey(id: BigInt, round: BigInt): Survey {
    let survey = Survey.load(id.toString() + '-' + round.toString());

    if (!survey) {
        survey = new Survey(id.toString() + '-' + round.toString());

        survey.surveyed = Address.zero();

        survey.round = round.toI32();

        survey.fud = BigInt.zero();
        survey.fomo = BigInt.zero();
        survey.alpha = BigInt.zero();
        survey.kek = BigInt.zero();

        survey.parcel = String.fromCodePoint(0);
    }

    return survey;
}
