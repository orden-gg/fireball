import React, { useContext, useEffect, useState } from 'react';

import { ClientContext } from '../../../contexts/ClientContext';
import Citadel from '../../../components/Citadel/Citadel';
import styles from '../styles';

export default function ClientRealmMap() {

    const { realm, setRealmView } = useContext(ClientContext);
    const [initialize, setInitialize] = useState(false);
    const classes = styles();

    useEffect( () => {
        setRealmView('map');
        setInitialize(true);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Citadel className={classes.clientCitadel} initialize={initialize} ownerParcels={realm} />
    );
}