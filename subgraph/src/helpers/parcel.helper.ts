import { BigInt } from '@graphprotocol/graph-ts';
import { Parcel } from '../../generated/schema';

export const loadOrCreateParcel = (realmId: BigInt): Parcel => {
    const id = realmId.toString();
    let parcel = Parcel.load(id);

    if (!parcel) {
        parcel = new Parcel(id);
    }

    return parcel;
};
