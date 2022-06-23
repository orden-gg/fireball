import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Backdrop, CircularProgress } from '@mui/material';

import { ParcelPreview } from 'components/Previews/ParcelPreview/ParcelPreview';
import { TheGraphApi } from 'api';

import { styles } from './styles';

export function ParcelPage() {
    const classes = styles();

    const [parcel, setParcel] = useState<any>(null);
    const [parcelLoading, setParcelLoading] = useState<boolean>(true);

    const { parcelId } = useParams<{ parcelId: string }>();

    useEffect(() => {
        let mounted = true;

        setParcelLoading(true);

        Promise.all([
            TheGraphApi.getRealmById(parcelId),
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
                    <ParcelPreview parcel={parcel} />
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
