import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Alert, Backdrop, CircularProgress } from '@mui/material';

import * as fromPortalStore from '../../Portal/store';
import { useAppDispatch, useAppSelector } from 'core/store/hooks';

import { ClientPortal } from 'pages/Client/models';

import { PortalPreview } from 'components/Previews/PortalPreview/PortalPreview';

import { styles } from '../components/styles';

export function PortalPage() {
  const classes = styles();

  const dispatch = useAppDispatch();

  const portal: ClientPortal = useAppSelector(fromPortalStore.getPortal);
  const isInitialPortalLoading: boolean = useAppSelector(fromPortalStore.getIsPortalLoaded);

  const { portalId } = useParams<{ portalId: CustomAny }>();

  useEffect(() => {
    dispatch(fromPortalStore.onLoadPortal(portalId));
  }, []);

  return (
    <div className={classes.container}>
      {isInitialPortalLoading ? (
        <Backdrop open={isInitialPortalLoading}>
          <CircularProgress color='primary' />
        </Backdrop>
      ) : portal ? (
        <PortalPreview portal={portal} />
      ) : (
        <div className={classes.alert}>
          <Alert variant='filled' severity='error'>
            There is no portal with id {portalId}
          </Alert>
        </div>
      )}
    </div>
  );
}
