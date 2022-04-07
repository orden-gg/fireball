import React, { useContext, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router';
import { IconButton } from '@mui/material';
import { Box } from '@mui/system';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import commonUtils from 'utils/commonUtils';

import GuildGotchis from '../components/GuildGotchis';
import GuildBanner from '../components/GuildInfo/GuildBanner';
import GuildsDetails from '../components/GuildInfo/GuildDetails';
import GuildNav from '../components/GuildNav';
import GuildsRealm from '../components/GuildsRealm';
import { guildStyles } from '../styles';
import { GuildsContext } from '../GuildsContext';

export default function Guild() {
    const params = useParams();
    const classes = guildStyles();
    const history = useHistory();
    const match = useRouteMatch();
    const {
        guildsData,
        currentGuild,
        setCurrentGuild,
        loadGuildRealm
    } = useContext(GuildsContext);

    useEffect(() => {
        let guild = guildsData.find( guild => (
            commonUtils.stringToKey(guild.name) === params.name
        ));

        if (guild === undefined || guild.members?.length === 0) {
            return history.push('/guilds');
        };

        setCurrentGuild(guild);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (Object.keys(currentGuild).length === 0) {
            return;
        };

        loadGuildRealm(currentGuild);
    }, [currentGuild]);

    return (
        <>
            <Box className={classes.guildWrapper}>
                <IconButton className={classes.backButton} onClick={ () => {history.push('/guilds')}} >
                    <ArrowBackIcon />
                </IconButton>

                <GuildBanner />

                {Boolean(currentGuild.description?.length) &&  <GuildsDetails />}

                <GuildNav />

                <Box className={classes.guildContent}>
                    <Switch>
                        <Route path={`${match.path}/gotchis`} component={ GuildGotchis } />
                        <Route path={`${match.path}/realm`} component={ GuildsRealm } />
                        <Redirect from={match.path} to={`${match.path}/gotchis`} />
                    </Switch>
                </Box>
            </Box>
        </>
    )
}
