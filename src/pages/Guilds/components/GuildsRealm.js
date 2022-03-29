import React, { useContext } from 'react';

import Citadel from 'components/Citadel/Citadel';
import { GuildsContext } from 'contexts/GuildsContext';

import { guildContentStyles } from '../styles';

export default function GuildRealm() {

    const { guildRealm } = useContext(GuildsContext);
    const classes = guildContentStyles();

    return (
        <Citadel className={classes.guildCitadel} ownerParcels={guildRealm} />
    );
}
