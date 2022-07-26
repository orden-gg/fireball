import { AppThunk } from 'core/store/store';
import { AlchemicaTypes } from 'shared/constants';
import { BigNumber, ParcelAlchemicaDictionary } from 'shared/models';
import { EthersApi, RealmApi } from 'api';

import { setRealmAlchemica } from '../slices';

export const loadRealmAlchemica = (parcelIds: number[]): AppThunk => async (dispatch) => {
    const realmAlchemicaPromises: Promise<BigNumber[]>[] = parcelIds.map(id => RealmApi.getRealmAlchemica(id));

    Promise.all([...realmAlchemicaPromises])
        .then((parcelsAlchemica: BigNumber[][]) => {
            const alchemicaDictionary: ParcelAlchemicaDictionary = {};

            parcelsAlchemica.forEach((parcelAlchemica: BigNumber[], index: number) => {
                alchemicaDictionary[`${parcelIds[index]}`] = {
                    [AlchemicaTypes.Fud]: Number(EthersApi.hexToNumber(parcelAlchemica[0]._hex).toFixed(0)),
                    [AlchemicaTypes.Fomo]: Number(EthersApi.hexToNumber(parcelAlchemica[1]._hex).toFixed(0)),
                    [AlchemicaTypes.Alpha]: Number(EthersApi.hexToNumber(parcelAlchemica[2]._hex).toFixed(0)),
                    [AlchemicaTypes.Kek]: Number(EthersApi.hexToNumber(parcelAlchemica[3]._hex).toFixed(0))
                };
            });

            dispatch(setRealmAlchemica(alchemicaDictionary));
        })
        .catch(() => dispatch(setRealmAlchemica({})));
};
