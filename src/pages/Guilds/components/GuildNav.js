import React, { useContext } from 'react';

import PageNav from 'components/PageNav/PageNav';
import { GotchiIcon, KekIcon } from 'components/Icons/Icons';
import { GuildsContext } from 'pages/Guilds/GuildsContext';

import { guildNavStyles } from '../styles';

export default function GuildNav() {
    const classes = guildNavStyles();
    const { currentGuild } = useContext(GuildsContext);
    const navData = [
        {
            name: 'gotchis',
            icon: <GotchiIcon />,
            loading: !currentGuild.gotchis,
            items: currentGuild.gotchis?.length
        },
        {
            name: 'lendings',
            icon: <GotchiIcon />,
            loading: !currentGuild.lendings,
            items: currentGuild.lendings?.length
        },
        {
            name: 'realm',
            icon: <KekIcon />,
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
