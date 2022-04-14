import React, { useContext } from 'react';

import PageNav from 'components/PageNav/PageNav';
import { GotchiIcon, KekIcon, LendingIcon } from 'components/Icons/Icons';
import { GuildsContext } from 'pages/Guilds/GuildsContext';

import { guildNavStyles } from '../styles';

export default function GuildNav() {
    const classes = guildNavStyles();
    const {
        guildId,
        gotchis,
        lendings,
        realm,
    } = useContext(GuildsContext);

    const navData = [
        {
            name: 'gotchis',
            icon: <GotchiIcon width={24} height={24} />,
            loading: !gotchis[guildId],
            items: gotchis[guildId]?.length
        },
        {
            name: 'lendings',
            icon: <LendingIcon width={24} height={24} />,
            loading: !lendings[guildId],
            items: lendings[guildId]?.length
        },
        {
            name: 'realm',
            icon: <KekIcon width={24} height={24} />,
            loading: !realm[guildId],
            items: realm[guildId]?.length
        }
    ];

    return (
        <div className={classes.guildNav}>
            <PageNav links={navData} />
        </div>
    );
}
