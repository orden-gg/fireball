import React, { useContext, useEffect, useMemo, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import Citadel from 'components/Citadel/Citadel';
import { ClientContext } from 'contexts/ClientContext';

import styles from '../styles';

export default function ClientRealmMap() {
    const { realm, setRealmView, loadingRealm } = useContext(ClientContext);
    const [parcelsGroups, setParcelsGroups] = useState([]);
    const classes = styles();
    useEffect(() => {
        setRealmView('map');
        if(realm.length > 0) {
            setParcelsGroups([
                {
                    parcels: realm,
                    icons: [<VisibilityIcon />, <VisibilityOffIcon />],
                    tooltip: 'Owner realm',
                    type: 'owner',
                    active: true,
                    animate: true
                }
            ])
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Citadel
            className={classes.clientCitadel}
            parcelsGroups={parcelsGroups}
            isLoaded={!loadingRealm}
        />
    );
}
