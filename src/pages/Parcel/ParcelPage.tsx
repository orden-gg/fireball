import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Backdrop, CircularProgress } from '@mui/material';

import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import { getRealmAlchemicaDictionary, loadRealmAlchemica } from 'core/store/realm-alchemica';
import { ParcelPreview } from 'components/Previews/ParcelPreview/ParcelPreview';
import { TheGraphApi } from 'api';

import { styles } from './styles';

export function ParcelPage() {
    const classes = styles();

    const dispatch = useAppDispatch();

    const [parcel, setParcel] = useState<any>(null);
    const [parcelLoading, setParcelLoading] = useState<boolean>(true);

    const { parcelId } = useParams<{ parcelId: string }>();

    const realmAlchemicaDictionary = useAppSelector(getRealmAlchemicaDictionary);

    useEffect(() => {
        let mounted = true;

        setParcelLoading(true);


        if (parcelId !== undefined) {
            dispatch(loadRealmAlchemica([Number(parcelId)]));
        }

        Promise.all([
            TheGraphApi.getRealmById(parcelId as string),
            TheGraphApi.getParcelsGotchiverseInfoByIds([parcelId])
        ])
            .then(([parcel, info]) => {
                if (mounted && parcel) {
                    setParcel({
                        ...parcel,
                        installations: info[0].installations
                    });
                }
            })
            .catch((err) => console.log(err))
            .finally(() => {
                if (mounted) {
                    setParcelLoading(false);
                }
            });

        return () => { mounted = false };
    }, [parcelId]);

    return (
        <div className={classes.container}>
            { parcelLoading ? (
                <Backdrop open={parcelLoading}>
                    <CircularProgress color='primary' />
                </Backdrop>
            ) : (
                parcel ? (
                    <ParcelPreview parcel={parcel} alchemica={realmAlchemicaDictionary[parcel.tokenId]} />
                ) : (
                    <div className={classes.alert}>
                        <Alert variant='filled' severity='error'>
                            There is no parcel with id {parcelId}
                        </Alert>
                    </div>
                )
            )}
        </div>
    );
}
