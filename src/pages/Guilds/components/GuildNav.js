import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { useTheme } from '@emotion/react';
import { useRouteMatch } from 'react-router';
import { NavLink } from 'react-router-dom';
import ContentLoader from 'react-content-loader';

import { GuildsContext } from 'contexts/GuildsContext';
import { GotchiIcon, KekIcon } from 'components/Icons/Icons';

import { guildNavStyles } from '../styles';

export default function GuildNav() {
    const match = useRouteMatch();
    const classes = guildNavStyles();
    const theme = useTheme();

    const {
        guildGotchis,
        guildRealm
    } = useContext(GuildsContext);

    return (
        <div className={classes.container}>
            <div className={classes.navItem}>
                <Button
                    disabled={!guildGotchis.length}
                    startIcon={
                        <GotchiIcon width={24} height={24} />
                    }
                    component={NavLink}
                    className={classes.button}
                    activeClassName='active'
                    to={{ pathname: `${match.url}/gotchis`}}
                >
                    Gotchis
                    {
                        !guildGotchis.length ? (
                            <ContentLoader
                                speed={2}
                                viewBox='0 0 28 14'
                                backgroundColor={theme.palette.secondary.main}
                                foregroundColor={theme.palette.primary.dark}
                                className={classes.buttonLoader}
                            >
                                <rect x='0' y='0' width='28' height='14' />
                            </ContentLoader>
                        ) : (
                            <span className={classes.label}>[{guildGotchis.length}]</span>
                        )
                    }
                </Button>
            </div>
            <div className={classes.navItem}>
                <Button
                    disabled={!guildRealm.length}
                    startIcon={
                        <KekIcon width={20} height={20} alt='realm' />
                    }
                    component={NavLink}
                    className={classes.button}
                    activeClassName='active'
                    to={{ pathname: `${match.url}/realm` }}
                >
                    Realm
                    {
                        !guildRealm.length ? (
                            <ContentLoader
                                speed={2}
                                viewBox='0 0 28 14'
                                backgroundColor={theme.palette.secondary.main}
                                foregroundColor={theme.palette.primary.dark}
                                className={classes.buttonLoader}
                            >
                                <rect x='0' y='0' width='28' height='14' />
                            </ContentLoader>
                        ) : (
                            <span className={classes.label}>[{guildRealm.length}]</span>
                        )
                    }
                </Button>
            </div>
        </div>
    );
}
