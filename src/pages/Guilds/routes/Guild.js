import React, { useContext, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router';
import { IconButton, Tooltip } from '@mui/material';
import { Box } from '@mui/system';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import GuildGotchis from '../components/GuildGotchis';
import GuildBanner from '../components/GuildBanner';
import GuildsDetails from '../components/GuildDetails';
import GuildNav from '../components/GuildNav';
import GuildsRealm from '../components/GuildsRealm';
import { GuildsContext } from '../GuildsContext';
import commonUtils from 'utils/commonUtils';

import { guildStyles } from '../styles';

export default function Guild() {
    const params = useParams();
    const classes = guildStyles();
    const history = useHistory();
    const match = useRouteMatch();
    const {
        guildsData,
        guildId,
        gotchis,
        lendings,
        setGuildId,
    } = useContext(GuildsContext);

    useEffect(() => {
        const guildId = guildsData.findIndex(guild => (
            commonUtils.stringToKey(guild.name) === params.name
        ));

        if (guildId === undefined || guildsData[guildId].members?.length === 0) {
            return history.push('/guilds');
        };

        setGuildId(guildId);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (guildId !== null) {
            // loadGuildData(guildId);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [guildId]);

    return (
        <>
            <Box className={classes.guildWrapper}>

                <div className={classes.guildSidebar}>
                    <GuildBanner />
                    {Boolean(guildsData[guildId]?.description?.length) &&  <GuildsDetails />}

                    <Tooltip
                        title='Back to guilds'
                    >
                        <IconButton className={classes.backButton} onClick={ () => {history.push('/guilds')}} >
                            <ArrowBackIcon />
                        </IconButton>
                    </Tooltip>
                </div>

                <Box className={classes.guildContent}>
                    <GuildNav />
                    <Switch>
                        <Route
                            path={`${match.path}/gotchis`}
                            component={() => <GuildGotchis gotchis={gotchis[guildId]} />}
                        />
                        <Route
                            path={`${match.path}/lendings`}
                            component={() => <GuildGotchis gotchis={lendings[guildId]} />}
                        />
                        <Route path={`${match.path}/realm`} component={ GuildsRealm } />
                        <Redirect from={match.path} to={`${match.path}/gotchis`} />
                    </Switch>
                </Box>
            </Box>
        </>
    )
}
