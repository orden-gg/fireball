import { useEffect, useMemo } from 'react';

import VisibilityIcon from '@mui/icons-material/Visibility';

import * as fromClientStore from '../store';
import { useAppDispatch, useAppSelector } from 'core/store/hooks';

import { RealmVM } from 'shared/models';

import { Citadel } from 'components/Citadel/Citadel';

import { RealmView } from '../constants';
import { styles } from '../styles';

export function ClientRealmMap() {
  const classes = styles();

  const dispatch = useAppDispatch();

  const realm: RealmVM[] = useAppSelector(fromClientStore.getRealm);
  const isRealmLoaded: boolean = useAppSelector(fromClientStore.getIsRealmLoaded);

  const realmGroups = useMemo(() => {
    const group: any[] = [];

    group.push({
      parcels: realm,
      /* eslint-disable-next-line react/jsx-key */
      icon: <VisibilityIcon />,
      tooltip: 'Owner realm',
      type: 'owner',
      active: true,
      animate: true
    });

    return group;
  }, [realm]);

  useEffect(() => {
    dispatch(fromClientStore.setRealmView(RealmView.Map));
  }, []);

  return (
    <div className={classes.clientCitadel}>
      <Citadel realmGroups={realmGroups} isLoaded={isRealmLoaded} />
    </div>
  );
}
