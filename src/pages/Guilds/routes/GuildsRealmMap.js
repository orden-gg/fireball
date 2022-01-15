import React, { useContext, useEffect, useState } from 'react';

import { GuildsContext } from '../../../contexts/GuildsContext';
import Citadel from '../../../components/Citadel/Citadel';
import { guildContentStyles } from '../styles';

export default function ClientRealm() {

    const { guildRealm, setRealmView } = useContext(GuildsContext);
    const [ initialize, setInitialize ] = useState(false);
    // const [de ]
    const classes = guildContentStyles();

    // const destroy = () => {
	// 	if (gameRef.current) gameRef.current.destroy();
	// 	setInitialize(false)
    // }

	useEffect( () => {
        if(guildRealm.length) setInitialize(true);
	}, [guildRealm]);

    useEffect( () => {
        setRealmView('map');
    }, []);

    return (
        <Citadel className={classes.guildCitadel} initialize={initialize} setInitialize={setInitialize} ownerParcels={guildRealm} />
    );
}