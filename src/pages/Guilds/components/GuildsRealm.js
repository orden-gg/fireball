import React, { useContext } from 'react';

import Citadel from 'components/Citadel/Citadel';
import { GuildsContext } from 'pages/Guilds/GuildsContext';

import { guildContentStyles } from '../styles';

export default function GuildRealm() {
    const { currentGuild } = useContext(GuildsContext);
    const classes = guildContentStyles();

    return <Citadel
        className={classes.guildCitadel}
        ownerParcels={currentGuild.realm || []}
    />
}
