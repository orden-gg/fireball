import { log } from '@graphprotocol/graph-ts';
import {
    AlchemicaClaimed as AlchemicaClaimedEvent,
    ChannelAlchemica as ChannelAlchemicaEvent,
    gotchiverse as RealmDiamond,
    MintParcel as MinParcelEvent,
    StartSurveying as StartSurveyingEvent,
    SurveyingRoundProgressed as SurveyingRoundProgressedEvent,
    Transfer as TransferEvent
} from '../../generated/gotchiverse/gotchiverse';
import { loadOrCreateParcel, loadOrCreatePlayer } from '../helpers';

export function handleChannelAlchemica(event: ChannelAlchemicaEvent): void {
    const parcel = loadOrCreateParcel(event.params._realmId);
    parcel.lastChanneled = event.block.timestamp;
    parcel.save();
}

export function handleAlchemicaClaimed(event: AlchemicaClaimedEvent): void {
    const parcel = loadOrCreateParcel(event.params._realmId);
    parcel.lastClaimed = event.block.timestamp;
    parcel.save();
}

export function handleMintParcel(event: MinParcelEvent): void {
    const parcel = loadOrCreateParcel(event.params._tokenId);
    const player = loadOrCreatePlayer(event.params._owner);

    // parcel.owner = event.params._owner.toHexString();
    const contract = RealmDiamond.bind(event.address);
    const _parcelInfo = contract.try_getParcelInfo(event.params._tokenId);

    if (!_parcelInfo.reverted) {
        const metadata = _parcelInfo.value;

        parcel.parcelId = metadata.parcelId;
        parcel.parcelHash = metadata.parcelAddress;
        parcel.size = metadata.size;
        parcel.district = metadata.district;
        parcel.coordinateX = metadata.coordinateX;
        parcel.coordinateY = metadata.coordinateY;

        parcel.boosts = metadata.boost;
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
    // parcel.owner = event.params._to.toHexString();

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
