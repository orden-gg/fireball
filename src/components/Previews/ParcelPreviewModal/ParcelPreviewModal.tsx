import { useEffect, useState } from 'react';

import { CircularProgress } from '@mui/material';

import classNames from 'classnames';

import { TheGraphApi } from 'api';

import { ParcelPreview } from '../ParcelPreview/ParcelPreview';
import { parcelPreviewModalStyles } from './styles';

export function ParcelPreviewModal({ id, parcel }: { id: number; parcel?: CustomAny }) {
  const classes = parcelPreviewModalStyles();

  const [modalParcel, setModalParcel] = useState<CustomAny | null>(null);
  const [isParcelLoading, setIsParcelLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted: boolean = true;

    if (parcel) {
      setModalParcel(parcel);
      setIsParcelLoading(false);
    } else {
      TheGraphApi.getRealmById(id.toString())
        .then(async (parcelRes: CustomAny) => {
          if (isMounted) {
            console.log('parcelRes', parcelRes);
            setModalParcel(parcelRes);
            setIsParcelLoading(false);
          }
        })
        .catch((error) => console.log(error));
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className={classNames(classes.previewModal, (isParcelLoading || !modalParcel) && 'emptyState')}>
      {!isParcelLoading ? (
        modalParcel ? (
          <ParcelPreview parcel={modalParcel} />
        ) : (
          <div className={classes.title}>There is no Parcel with such ID :(</div>
        )
      ) : (
        <CircularProgress color='primary' />
      )}
    </div>
  );
}
