import React, { useContext, useEffect } from 'react';

import Citadel from 'components/Citadel/Citadel';
import { GuildsContext } from 'pages/Guilds/GuildsContext';
import thegraphApi from 'api/thegraph.api';

import { guildContentStyles } from '../styles';

export default function GuildRealm() {
    const classes = guildContentStyles();

    const { guilds, guildId, guildRealm, setGuildRealm } = useContext(GuildsContext);


    useEffect(() => {
        let mounted = true;

        if (guildId === null) {
            return;
        }

        thegraphApi.getRealmByAddresses(guilds[guildId].members).then(realm => {
            if (mounted) {
                setGuildRealm(realm);
            }
        });

        return () => mounted = false;
    }, [guilds, guildId, setGuildRealm]);

    return <Citadel
        className={classes.guildCitadel}
        ownerParcels={guildRealm || []}
    />
}
