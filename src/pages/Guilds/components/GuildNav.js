import React, { useContext } from 'react';

import PageNav from 'components/PageNav/PageNav';
import { GuildsContext } from 'pages/Guilds/GuildsContext';
import gotchiPlaceholder from 'assets/images/gotchi-placeholder.svg';
import realmPlaceholder from 'assets/images/icons/kek.png';

import { guildNavStyles } from '../styles';

export default function GuildNav() {
    const classes = guildNavStyles();
    const { currentGuild } = useContext(GuildsContext);
    const navData = [
        {
            name: 'gotchis',
            icon: gotchiPlaceholder,
            loading: !currentGuild.gotchis,
            items: currentGuild.gotchis?.length
        },
        {
            name: 'lendings',
            icon: gotchiPlaceholder,
            loading: !currentGuild.lendings,
            items: currentGuild.lendings?.length
        },
        {
            name: 'realm',
            icon: realmPlaceholder,
            loading: !currentGuild.realm,
            items: currentGuild.realm?.length
        }
    ];

    return (
        <div className={classes.guildNav}>
            <PageNav links={navData} />
        </div>
    );
}
