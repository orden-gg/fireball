import { BigInt } from '@graphprotocol/graph-ts';
import { Parcel } from '../../generated/schema';
import { AlchemicaTypes } from '../shared/enums';

export const loadOrCreateParcel = (realmId: BigInt): Parcel => {
    const id = realmId.toString();
    let parcel = Parcel.load(id);

    if (!parcel) {
        parcel = new Parcel(id);
        parcel.alchemicaBag = [
            BigInt.zero(),
            BigInt.zero(),
            BigInt.zero(),
            BigInt.zero()
        ];
    }

    return parcel;
};

export const increaseCurrentSurvey = (alchemicaBag: BigInt[], alchemicas: BigInt[]): BigInt[] => {
    const currentBag = alchemicaBag;

    currentBag[AlchemicaTypes.Fud] = currentBag[AlchemicaTypes.Fud].plus(alchemicas[AlchemicaTypes.Fud]);
    currentBag[AlchemicaTypes.Fomo] = currentBag[AlchemicaTypes.Fomo].plus(alchemicas[AlchemicaTypes.Fomo]);
    currentBag[AlchemicaTypes.Alpha] = currentBag[AlchemicaTypes.Alpha].plus(alchemicas[AlchemicaTypes.Alpha]);
    currentBag[AlchemicaTypes.Kek] = currentBag[AlchemicaTypes.Kek].plus(alchemicas[AlchemicaTypes.Kek]);

    return currentBag;
}
