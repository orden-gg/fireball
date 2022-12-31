import { AppThunk } from 'core/store/store';
import { AlchemicaTypes } from 'shared/constants';
import { BigNumber, ParcelAlchemicaDictionary } from 'shared/models';
import { EthersApi, RealmApi } from 'api';

import { setRealmAlchemica } from '../slices';

export const loadRealmAlchemica =
    (parcelIds: number[]): AppThunk =>
    async (dispatch) => {
        const realmAlchemicaPromises: Promise<BigNumber[]>[] = parcelIds.map((id) => RealmApi.getRealmAlchemica(id));
        // const roundAlchemicaPromises: Promise<BigNumber[]>[] = parcelIds.map((id) => RealmApi.getRoundAlchemica(id, 0));

        // Promise.all(roundAlchemicaPromises).then((roundAlchemica: BigNumber[][]) => {
        //     console.log(roundAlchemica);
        // });

        Promise.all([...realmAlchemicaPromises])
            .then((parcelsAlchemica: BigNumber[][]) => {
                const alchemicaDictionary: ParcelAlchemicaDictionary = {};

                parcelsAlchemica.forEach((parcelAlchemica: BigNumber[], index: number) => {
                    alchemicaDictionary[`${parcelIds[index]}`] = {
                        [AlchemicaTypes.Fud]: {
                            amount: Number(EthersApi.hexToNumber(parcelAlchemica[0]._hex).toFixed(0)),
                            maxSupply: 0
                        },
                        [AlchemicaTypes.Fomo]: {
                            amount: Number(EthersApi.hexToNumber(parcelAlchemica[1]._hex).toFixed(0)),
                            maxSupply: 0
                        },
                        [AlchemicaTypes.Alpha]: {
                            amount: Number(EthersApi.hexToNumber(parcelAlchemica[2]._hex).toFixed(0)),
                            maxSupply: 0
                        },
                        [AlchemicaTypes.Kek]: {
                            amount: Number(EthersApi.hexToNumber(parcelAlchemica[3]._hex).toFixed(0)),
                            maxSupply: 0
                        }
                    };
                });

                dispatch(setRealmAlchemica(alchemicaDictionary));
            })
            .catch(() => dispatch(setRealmAlchemica({})));
    };
