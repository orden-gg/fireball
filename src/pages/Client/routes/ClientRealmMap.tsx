import { useContext, useEffect, useMemo } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { Citadel } from 'components/Citadel/Citadel';
import { ClientContext } from 'contexts/ClientContext';

import styles from '../styles';

export function ClientRealmMap() {
    const { realm, setRealmView, loadingRealm } = useContext<any>(ClientContext);
    const classes = styles();

    const realmGroups = useMemo(() => {
        const group: any[] = [];

        group.push({
            parcels: realm,
            /* eslint-disable-next-line react/jsx-key */
            icons: [<VisibilityOffIcon />, <VisibilityIcon />],
            tooltip: 'Owner realm',
            type: 'owner',
            active: true,
            animate: true
        });

        return group;
    }, [realm]);

    useEffect(() => {
        setRealmView('map');
    }, []);

    return (
        <Citadel
            className={classes.clientCitadel}
            realmGroups={realmGroups}
            isLoaded={!loadingRealm}
        />
    );
}
