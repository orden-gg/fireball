import React, { useContext, useEffect } from 'react';

import Citadel from 'components/Citadel/Citadel';
import { GuildsContext } from 'pages/Guilds/GuildsContext';
import thegraphApi from 'api/thegraph.api';

import { guildContentStyles } from '../styles';

export default function GuildRealm() {
    const { guildsData, guildId, guildRealm, setGuildRealm } = useContext(GuildsContext);
    const classes = guildContentStyles();


    useEffect(() => {
        let mounted = true;

        if(guildId === null) {
            return;
        }

        thegraphApi.getRealmByAddresses(guildsData[guildId].members).then(realm => {
            if(mounted) {
                setGuildRealm(realm);
            }
        });

        return () => mounted = false;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [guildId]);

    return <Citadel
        className={classes.guildCitadel}
        ownerParcels={guildRealm || []}
    />
}
