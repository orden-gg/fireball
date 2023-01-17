import { BigInt, dataSource, log } from '@graphprotocol/graph-ts';
import { gotchiverse as RealmDiamond } from '../../generated/gotchiverse/gotchiverse';
import { Parcel } from '../../generated/schema';
import { BIGINT_ZERO } from '../shared/constants/common.constants';
import { AlchemicaTypes } from '../shared/enums';

export const loadOrCreateParcel = (realmId: BigInt): Parcel => {
    const id = realmId.toString();
    let parcel = Parcel.load(id);

    if (!parcel) {
        parcel = new Parcel(id);
        parcel.timesTraded = BIGINT_ZERO;
        parcel.installations = [];
        parcel.tiles = [];
        parcel.alchemica = [BigInt.zero(), BigInt.zero(), BigInt.zero(), BigInt.zero()];
    }

    log.warning('parcel: {}, diamond: {}', [realmId.toString(), dataSource.address().toHexString()]);

    if (!parcel.parcelId) {
        const contract = RealmDiamond.bind(dataSource.address());
        const _parcelInfo = contract.try_getParcelInfo(realmId);

        if (!_parcelInfo.reverted) {
            const metadata = _parcelInfo.value;

            parcel.parcelId = metadata.parcelId;
            parcel.parcelHash = metadata.parcelAddress;
            parcel.size = metadata.size.toI32();
            parcel.district = metadata.district.toI32();
            parcel.coordinateX = metadata.coordinateX.toI32();
            parcel.coordinateY = metadata.coordinateY.toI32();

            parcel.fudBoost = metadata.boost[AlchemicaTypes.Fud];
            parcel.fomoBoost = metadata.boost[AlchemicaTypes.Fomo];
            parcel.alphaBoost = metadata.boost[AlchemicaTypes.Alpha];
            parcel.kekBoost = metadata.boost[AlchemicaTypes.Kek];

            log.warning('parcel: {}, DATA ARRIVED, id - {}', [realmId.toString(), metadata.parcelId]);
        } else {
            log.error('parcel: {}, REVERTED', [realmId.toString()]);
        }
    }

    return parcel;
};

export const increaseCurrentSurvey = (alchemica: BigInt[], alchemicas: BigInt[]): BigInt[] => {
    const currentAlchemica = alchemica;

    currentAlchemica[AlchemicaTypes.Fud] = currentAlchemica[AlchemicaTypes.Fud].plus(alchemicas[AlchemicaTypes.Fud]);
    currentAlchemica[AlchemicaTypes.Fomo] = currentAlchemica[AlchemicaTypes.Fomo].plus(alchemicas[AlchemicaTypes.Fomo]);
    currentAlchemica[AlchemicaTypes.Alpha] = currentAlchemica[AlchemicaTypes.Alpha].plus(
        alchemicas[AlchemicaTypes.Alpha]
    );
    currentAlchemica[AlchemicaTypes.Kek] = currentAlchemica[AlchemicaTypes.Kek].plus(alchemicas[AlchemicaTypes.Kek]);

    return currentAlchemica;
};
