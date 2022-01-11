import React, { useContext, useEffect, useState } from 'react';

import { ClientContext } from '../../../contexts/ClientContext';
import Citadel from '../../../components/Citadel/Citadel';
export default function ClientRealm() {

    const { realm, setRealmView } = useContext(ClientContext);
    const [initialize, setInitialize] = useState(false);

	useEffect( () => {
		
        setTimeout(() => {
            if(realm.length) setInitialize(true);
        }, 100)
	}, [realm.length]);

    useEffect( () => {
        setRealmView('map');
    }, []);

    return (
        <Citadel initialize={initialize} setInitialize={setInitialize} ownerParcels={realm} />
    );
}