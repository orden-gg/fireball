import { BigInt } from '@graphprotocol/graph-ts';
import { Installation, Parcel } from '../../generated/schema';

export function loadOrCreateInstallation(parcelId: BigInt, installationId: BigInt, x: BigInt, y: BigInt): Installation {
    let id = 'inst' + parcelId.toString() + '-' + installationId.toString() + '-' + x.toString() + '-' + y.toString();
    let installation = Installation.load(id);
    if (!installation) {
        installation = new Installation(id);
        installation.parcel = parcelId.toString();
        installation.installationId = installationId.toI32();
        installation.x = x.toI32();
        installation.y = y.toI32();
    }
    return installation;
}

export const equipInstallation = (parcel: Parcel, installationId: BigInt, x: BigInt, y: BigInt): Parcel => {
    const installations = parcel.installations;
    const id = 'inst' + parcel.id + '-' + installationId.toString() + '-' + x.toString() + '-' + y.toString();

    installations.push(id);
    parcel.installations = installations;

    return parcel;
};

export const unequipInstallation = (parcel: Parcel, installationId: BigInt, x: BigInt, y: BigInt): Parcel => {
    const id = 'inst' + parcel.id + '-' + installationId.toString() + '-' + x.toString() + '-' + y.toString();
    const installations = parcel.installations;
    const newInstallations = new Array<string>();

    for (let i = 0; i < installations.length; i++) {
        const item = installations[i];

        if (item !== id) {
            newInstallations.push(item);
        }
    }

    parcel.installations = newInstallations;
    return parcel;
};
