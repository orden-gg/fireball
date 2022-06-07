import { useContext, useEffect, useMemo } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import Citadel from 'components/Citadel/Citadel';
import { ClientContext } from 'contexts/ClientContext';

import styles from '../styles';

export default function ClientRealmMap() {
    const { realm, setRealmView, loadingRealm } = useContext(ClientContext);
    const classes = styles();

    const realmGroups = useMemo(() => {
        const group = [];

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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Citadel
            className={classes.clientCitadel}
            realmGroups={realmGroups}
            isLoaded={!loadingRealm}
        />
    );
}
