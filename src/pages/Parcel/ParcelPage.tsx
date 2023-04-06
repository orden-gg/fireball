import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Alert, Backdrop, CircularProgress } from '@mui/material';

import { TheGraphApi } from 'api';

import { ParcelPreview } from 'components/Previews/ParcelPreview/ParcelPreview';

import { InstallationsUtils, TilesUtils } from 'utils';

import { styles } from './styles';

export function ParcelPage() {
  const classes = styles();

  const [parcel, setParcel] = useState<CustomAny>(null);

  const [parcelLoading, setParcelLoading] = useState<boolean>(true);

  const { parcelId } = useParams<{ parcelId: string }>();

  useEffect(() => {
    let mounted = true;

    setParcelLoading(true);

    TheGraphApi.getRealmById(parcelId as string)
      .then((parcel) => {
        if (mounted && parcel) {
          if (parcel.installations.length > 0) {
            parcel.installations = InstallationsUtils.combineInstallations(parcel.installations);
          }

          if (parcel.tiles.length > 0) {
            parcel.tiles = TilesUtils.combineTiles(parcel.tiles);
          }

          setParcel(parcel);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        if (mounted) {
          setParcelLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [parcelId]);

  return (
    <div className={classes.container}>
      {parcelLoading ? (
        <Backdrop open={parcelLoading}>
          <CircularProgress color='primary' />
        </Backdrop>
      ) : parcel ? (
        <ParcelPreview parcel={parcel} />
      ) : (
        <div className={classes.alert}>
          <Alert variant='filled' severity='error'>
            There is no parcel with id {parcelId}
          </Alert>
        </div>
      )}
    </div>
  );
}
