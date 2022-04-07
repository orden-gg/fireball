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

export default function GuildNav() {
    const match = useRouteMatch();
    const classes = guildNavStyles();
    const theme = useTheme();
    const { currentGuild } = useContext(GuildsContext);

    return (
        <div className={classes.container}>
            <div className={classes.navItem}>
                <Button
                    disabled={!currentGuild.gotchis}
                    startIcon={
                        <img src={gotchiPlaceholder} alt='gotchi' width={24} height={24} />
                    }
                    component={NavLink}
                    className={classes.button}
                    activeClassName='active'
                    to={{pathname: `${match.url}/gotchis`}}
                >
                    Gotchis
                    {
                        currentGuild.gotchis ? (
                            <span className={classes.label}>[{currentGuild.gotchis.length}]</span>
                        ) : (
                            <ContentLoader
                                speed={2}
                                viewBox='0 0 28 14'
                                backgroundColor={theme.palette.secondary.main}
                                foregroundColor={theme.palette.primary.dark}
                                className={classes.buttonLoader}
                            >
                                <rect x='0' y='0' width='28' height='14' />
                            </ContentLoader>
                        )
                    }
                </Button>
            </div>
            <div className={classes.navItem}>
                <Button
                    disabled={!currentGuild.realm}
                    startIcon={
                        <img src={realmPlaceholder} alt='gotchi' width={20} />
                    }
                    component={NavLink}
                    className={classes.button}
                    activeClassName='active'
                    to={{pathname: `${match.url}/realm`}}
                >
                    Realm
                    {
                        currentGuild.realm ? (
                            <span className={classes.label}>[{currentGuild.realm.length}]</span>
                        ) : (
                            <ContentLoader
                                speed={2}
                                viewBox='0 0 28 14'
                                backgroundColor={theme.palette.secondary.main}
                                foregroundColor={theme.palette.primary.dark}
                                className={classes.buttonLoader}
                            >
                                <rect x='0' y='0' width='28' height='14' />
                            </ContentLoader>
                        )
                    }
                </Button>
            </div>
        </div>
    );
}
