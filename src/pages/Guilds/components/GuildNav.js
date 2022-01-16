import React, { useContext } from 'react';
import { Button, Tooltip, Switch } from '@mui/material';
import { useTheme } from '@emotion/react';
import { useHistory, useRouteMatch } from 'react-router';

import { NavLink } from 'react-router-dom';

import { GuildsContext } from '../../../contexts/GuildsContext';

import gotchiPlaceholder from '../../../assets/images/gotchi-placeholder.svg';
import realmPlaceholder from '../../../assets/images/icons/kek.png';
import ContentLoader from 'react-content-loader';

import { guildNavStyles } from '../styles';

export default function GuildNav() {
    const match = useRouteMatch();
    const history = useHistory();
    const classes = guildNavStyles();
    const theme = useTheme();

    const { 
        guildGotchis,
        guildRealm,
        realmView
     } = useContext(GuildsContext);

    const updateRealmView = () => {
        let view = realmView === 'list' ? 'map' : 'list';
        let url = `${match.url}/realm/${view}`;

        history.push({ pathname: url });
    }

    return (
        <div className={classes.container}>
            <div className={classes.navItem}>
                <Button
                    disabled={!guildGotchis.length}
                    startIcon={
                        <img src={gotchiPlaceholder} alt='gotchi' width={24} height={24} />
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
                        <img src={realmPlaceholder} alt='gotchi' width={20} />
                    }
                    component={NavLink}
                    className={classes.button}
                    activeClassName='active'
                    to={{ pathname: `${match.url}/realm/${realmView}` }}
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
                <Tooltip
                    title={`Switch to ${realmView === 'map' ? 'list' : 'map'}`}
                    enterTouchDelay={0}
                >

                    <Switch 
                        className={classes.realmViewSwitch}
                        checked={realmView === 'map'}
                        onChange={updateRealmView}
                    />
                </Tooltip>
            </div>
        </div>
    );
}