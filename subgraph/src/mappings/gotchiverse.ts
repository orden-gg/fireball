import { BigInt, log } from '@graphprotocol/graph-ts';
import {
    AlchemicaClaimed as AlchemicaClaimedEvent,
    ChannelAlchemica as ChannelAlchemicaEvent,
    gotchiverse as RealmDiamond,
    MintParcel as MinParcelEvent,
    StartSurveying as StartSurveyingEvent,
    SurveyingRoundProgressed as SurveyingRoundProgressedEvent,
    SurveyParcel,
    Transfer as TransferEvent,
    gotchiverse
} from '../../generated/gotchiverse/gotchiverse';
import { increaseCurrentSurvey, loadOrCreateParcel, loadOrCreatePlayer, loadOrCreateSurvey } from '../helpers';
import { AlchemicaTypes } from '../shared/enums';

export function handleChannelAlchemica(event: ChannelAlchemicaEvent): void {
    const parcel = loadOrCreateParcel(event.params._realmId);
    parcel.lastChanneled = event.block.timestamp;
    parcel.save();
}

export function handleAlchemicaClaimed(event: AlchemicaClaimedEvent): void {
    const type = event.params._alchemicaType.toI32();
    const parcel = loadOrCreateParcel(event.params._realmId);
    const alchemicaBag = parcel.alchemicaBag;

    log.warning('amount: {}', [event.params._amount.toString()]);

    alchemicaBag[type] = alchemicaBag[type].minus(event.params._amount);

    parcel.lastClaimed = event.block.timestamp;

    log.warning('type: {}', [type.toString()]);

    parcel.alchemicaBag = alchemicaBag;

    parcel.save();
}

export function handleMintParcel(event: MinParcelEvent): void {
    const owner = event.params._owner;

    const parcel = loadOrCreateParcel(event.params._tokenId);
    const player = loadOrCreatePlayer(owner);

    parcel.owner = owner.toHexString();
    const contract = RealmDiamond.bind(event.address);
    const _parcelInfo = contract.try_getParcelInfo(event.params._tokenId);

    if (!_parcelInfo.reverted) {
        const metadata = _parcelInfo.value;

        parcel.owner = owner.toHexString();

        parcel.parcelId = metadata.parcelId;
        parcel.parcelHash = metadata.parcelAddress;
        parcel.size = metadata.size;
        parcel.district = metadata.district;
        parcel.coordinateX = metadata.coordinateX;
        parcel.coordinateY = metadata.coordinateY;

        parcel.fudBoost = metadata.boost[AlchemicaTypes.Fud];
        parcel.fomoBoost = metadata.boost[AlchemicaTypes.Fomo];
        parcel.alphaBoost = metadata.boost[AlchemicaTypes.Alpha];
        parcel.kekBoost = metadata.boost[AlchemicaTypes.Kek];
    }

    player.parcelsCount = player.parcelsCount + 1;

    parcel.save();
    player.save();
}

export function handleTransfer(event: TransferEvent): void {
    const parcel = loadOrCreateParcel(event.params._tokenId);
    const prevOwner = loadOrCreatePlayer(event.params._from);
    const nextOwner = loadOrCreatePlayer(event.params._to);

    prevOwner.parcelsCount = prevOwner.parcelsCount - 1;
    nextOwner.parcelsCount = nextOwner.parcelsCount + 1;
    parcel.owner = event.params._to.toHexString();

    prevOwner.save();
    nextOwner.save();
    parcel.save();
}

export function handleStartSurveying(event: StartSurveyingEvent): void {
    // const parcel = loadOrCreateParcel(event.params._realmId);

    log.error('surveying: parcel - {}, round - {}', [event.params._realmId.toString(), event.params._round.toString()]);

    const contract = RealmDiamond.bind(event.address);
    // const _survey = contract.try_getRealmAlchemica(event.params._realmId); // ? parcel remaining alchemica
    const _survey = contract.try_getRoundAlchemica(event.params._realmId, event.params._round); // ? parcel round alchemica

    if (!_survey.reverted) {
        log.error('RESPONSE: parcel - {}, data - {}', [event.params._realmId.toString(), _survey.value.toString()]);
    }
}

export function handleSurveyingRoundProgressed(event: SurveyingRoundProgressedEvent): void {
    // ! Triggered when diamond owner increment the surveying round (basically should show current round)
    log.error('proggressed: new round - {}', [event.params._newRound.toString()]);
}

export function handleSurveyParcel(event: SurveyParcel): void {
    const round = event.params._round;
    const alchemicas = event.params._alchemicas;

    const survey = loadOrCreateSurvey(event.params._tokenId, round);
    const parcel = loadOrCreateParcel(event.params._tokenId);

    if (round == BigInt.zero()) {
        parcel.alchemicaBag = alchemicas;
    } else {
        parcel.alchemicaBag = increaseCurrentSurvey(parcel.alchemicaBag, alchemicas);
    }

    parcel.save();

    survey.parcel = event.params._tokenId.toString();

    survey.surveyed = event.transaction.from;

    survey.fud = alchemicas[AlchemicaTypes.Fud];
    survey.fomo = alchemicas[AlchemicaTypes.Fomo];
    survey.alpha = alchemicas[AlchemicaTypes.Alpha];
    survey.kek = alchemicas[AlchemicaTypes.Kek];

    survey.save();
}
