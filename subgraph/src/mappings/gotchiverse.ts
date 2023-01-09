import { BigInt, log } from '@graphprotocol/graph-ts';
import {
    AlchemicaClaimed as AlchemicaClaimedEvent,
    ChannelAlchemica as ChannelAlchemicaEvent,
    EquipInstallation as EquipInstallationEvent,
    EquipTile as EquipTileEvent,
    gotchiverse as RealmDiamond,
    InstallationUpgraded as InstallationUpgradedEvent,
    MintParcel as MinParcelEvent,
    SurveyingRoundProgressed as SurveyingRoundProgressedEvent,
    SurveyParcel as SurveyParcelEvent,
    Transfer as TransferEvent,
    UnequipInstallation as UnequipInstallationEvent,
    UnequipTile as UnequipTileEvent
} from '../../generated/gotchiverse/gotchiverse';
import {
    equipInstallation,
    equipTile,
    increaseCurrentSurvey,
    loadOrCreateGotchi,
    loadOrCreateInstallation,
    loadOrCreateParcel,
    loadOrCreatePlayer,
    loadOrCreateSurvey,
    loadOrCreateTile,
    unequipInstallation,
    unequipTile
} from '../helpers';
import { AlchemicaTypes } from '../shared/enums';

export function handleChannelAlchemica(event: ChannelAlchemicaEvent): void {
    const parcel = loadOrCreateParcel(event.params._realmId);
    const gotchi = loadOrCreateGotchi(event.params._gotchiId);

    parcel.lastChanneled = event.block.timestamp.toI32();
    gotchi.lastChanneled = event.block.timestamp.toI32();

    parcel.save();
    gotchi.save();
}

export function handleAlchemicaClaimed(event: AlchemicaClaimedEvent): void {
    const type = event.params._alchemicaType.toI32();
    const parcel = loadOrCreateParcel(event.params._realmId);
    const alchemica = parcel.alchemica;

    alchemica[type] = alchemica[type].minus(event.params._amount);

    parcel.lastClaimed = event.block.timestamp.toI32();
    parcel.alchemica = alchemica;

    parcel.save();
}

export function handleMintParcel(event: MinParcelEvent): void {
    const owner = event.params._owner;

    const parcel = loadOrCreateParcel(event.params._tokenId);
    const player = loadOrCreatePlayer(owner);

    const contract = RealmDiamond.bind(event.address);
    const _parcelInfo = contract.try_getParcelInfo(event.params._tokenId);

    parcel.owner = owner.toHexString();

    if (!_parcelInfo.reverted) {
        const metadata = _parcelInfo.value;

        parcel.parcelId = metadata.parcelId;
        parcel.parcelHash = metadata.parcelAddress;
        parcel.size = metadata.size.toI32();
        parcel.district = metadata.district.toI32();
        parcel.coordinateX = metadata.coordinateX.toI32();
        parcel.coordinateY = metadata.coordinateY.toI32();
        parcel.owner = owner.toHexString();

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

export function handleSurveyingRoundProgressed(event: SurveyingRoundProgressedEvent): void {
    // ! Triggered when diamond owner increment the surveying round (basically should show current round)
    log.error('proggressed: new round - {}', [event.params._newRound.toString()]);
}

export function handleSurveyParcel(event: SurveyParcelEvent): void {
    const round = event.params._round;
    const alchemicas = event.params._alchemicas;

    const survey = loadOrCreateSurvey(event.params._tokenId, round);
    const parcel = loadOrCreateParcel(event.params._tokenId);

    if (round === BigInt.zero()) {
        parcel.alchemica = alchemicas;
    } else {
        parcel.alchemica = increaseCurrentSurvey(parcel.alchemica, alchemicas);
    }

    survey.parcel = event.params._tokenId.toString();
    survey.surveyed = event.transaction.from;
    survey.fud = alchemicas[AlchemicaTypes.Fud];
    survey.fomo = alchemicas[AlchemicaTypes.Fomo];
    survey.alpha = alchemicas[AlchemicaTypes.Alpha];
    survey.kek = alchemicas[AlchemicaTypes.Kek];

    survey.save();
    parcel.save();
}

export function handleEquipInstallation(event: EquipInstallationEvent): void {
    let parcel = loadOrCreateParcel(event.params._realmId);

    parcel = equipInstallation(parcel, event.params._installationId, event.params._x, event.params._y);
    parcel.save();

    const installation = loadOrCreateInstallation(
        event.params._realmId,
        event.params._installationId,
        event.params._x,
        event.params._y
    );
    installation.owner = event.transaction.from.toHexString(); // !TODO: owner should not be event.transaction.from (possibly not real owner)
    installation.equipped = true;
    installation.save();
}

export function handleInstallationUpgraded(event: InstallationUpgradedEvent): void {
    let parcel = loadOrCreateParcel(event.params._realmId);
    parcel = unequipInstallation(
        parcel,
        event.params._prevInstallationId,
        event.params._coordinateX,
        event.params._coordinateY
    );
    parcel = equipInstallation(
        parcel,
        event.params._nextInstallationId,
        event.params._coordinateX,
        event.params._coordinateY
    );
    parcel.save();

    // unequip old
    let installation = loadOrCreateInstallation(
        event.params._realmId,
        event.params._prevInstallationId,
        event.params._coordinateX,
        event.params._coordinateY
    );
    installation.equipped = false;
    installation.save();

    // equip new
    installation = loadOrCreateInstallation(
        event.params._realmId,
        event.params._nextInstallationId,
        event.params._coordinateX,
        event.params._coordinateY
    );
    installation.equipped = true;
    installation.owner = event.transaction.from.toHexString(); // !TODO: owner should not be event.transaction.from (possibly not real owner)
    installation.save();
}

export function handleUnequipInstallation(event: UnequipInstallationEvent): void {
    let parcel = loadOrCreateParcel(event.params._realmId);
    parcel = unequipInstallation(parcel, event.params._installationId, event.params._x, event.params._y);
    parcel.save();

    const installation = loadOrCreateInstallation(
        event.params._realmId,
        event.params._installationId,
        event.params._x,
        event.params._y
    );
    installation.equipped = false;
    installation.save();
}

export function handleEquipTile(event: EquipTileEvent): void {
    let parcel = loadOrCreateParcel(event.params._realmId);
    parcel = equipTile(parcel, event.params._tileId, event.params._x, event.params._y);
    parcel.save();

    const tile = loadOrCreateTile(event.params._realmId, event.params._tileId, event.params._x, event.params._y);
    tile.owner = event.transaction.from.toHexString(); // !TODO: owner should not be event.transaction.from (possibly not real owner)
    tile.equipped = true;
    tile.save();
}

export function handleUnequipTile(event: UnequipTileEvent): void {
    let parcel = loadOrCreateParcel(event.params._realmId);
    parcel = unequipTile(parcel, event.params._tileId, event.params._x, event.params._y);
    parcel.save();

    const tile = loadOrCreateTile(event.params._realmId, event.params._tileId, event.params._x, event.params._y);
    tile.equipped = false;
    tile.save();
}
