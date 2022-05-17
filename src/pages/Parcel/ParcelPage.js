import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ParcelPreview from 'components/Previews/ParcelPreview/ParcelPreview';
import thegraphApi from 'api/thegraph.api';

import styles from './styles';
import { Alert, Backdrop, CircularProgress } from '@mui/material';

export default function ParcelPage() {
    const classes = styles();

    const [parcel, setParcel] = useState(null);
    const [parcelLoading, setParcelLoading] = useState(true);

    const { parcelId } = useParams();

    useEffect(() => {
        let mounted = true;

        setParcelLoading(true);

        thegraphApi.getRealmFromClientById(parcelId).then((res) => {
            if (mounted) {
                setParcel(res);
                setParcelLoading(false);
            }
        }).catch((err) => {
            if (mounted) {
                console.log(err);
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
