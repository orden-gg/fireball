import { BigInt } from '@graphprotocol/graph-ts';
import { Parcel } from '../../generated/schema';
import { AlchemicaTypes } from '../shared/enums';

export const loadOrCreateParcel = (realmId: BigInt): Parcel => {
    const id = realmId.toString();
    let parcel = Parcel.load(id);

    if (!parcel) {
        parcel = new Parcel(id);
        parcel.installations = [];
        parcel.tiles = [];
        parcel.alchemica = [BigInt.zero(), BigInt.zero(), BigInt.zero(), BigInt.zero()];
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
