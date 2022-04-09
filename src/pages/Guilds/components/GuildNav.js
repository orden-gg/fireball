import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { useTheme } from '@emotion/react';
import { useRouteMatch } from 'react-router';
import { NavLink } from 'react-router-dom';
import ContentLoader from 'react-content-loader';

import { GuildsContext } from 'pages/Guilds/GuildsContext';
import gotchiPlaceholder from 'assets/images/gotchi-placeholder.svg';
import realmPlaceholder from 'assets/images/icons/kek.png';

import { guildNavStyles } from '../styles';
import PageNav from 'components/PageNav/PageNav';

export default function GuildNav() {
    const match = useRouteMatch();
    const classes = guildNavStyles();
    const theme = useTheme();
    const { currentGuild } = useContext(GuildsContext);
    const navData = [
        {
            name: 'gotchis',
            icon: gotchiPlaceholder,
            loading: !currentGuild.gotchis,
            items: currentGuild.gotchis?.length
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
