import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Backdrop, CircularProgress } from '@mui/material';

import ParcelPreview from 'components/Previews/ParcelPreview/ParcelPreview';
import thegraphApi from 'api/thegraph.api';

import styles from './styles';

export default function ParcelPage() {
    const classes = styles();

    const [parcel, setParcel] = useState(null);
    const [parcelLoading, setParcelLoading] = useState(true);

    const { parcelId } = useParams();

    useEffect(() => {
        let mounted = true;

        setParcelLoading(true);

        thegraphApi.getRealmById(parcelId)
            .then(res => {
                if (mounted) {
                    setParcel(res);
                }
            })
            .catch((err) => console.log(err))
            .finally(() => {
                if (mounted) {
                    setParcelLoading(false);
                }
            });

        return () => mounted = false;
    }, [parcelId]);

    return (
        <div className={classes.container}>
            { parcelLoading ? (
                <Backdrop className={classes.backdrop} open={parcelLoading}>
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
