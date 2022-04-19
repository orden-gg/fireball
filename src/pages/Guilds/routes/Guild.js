import React, { useContext, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router';
import { IconButton, Tooltip } from '@mui/material';
import { Box } from '@mui/system';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import GuildBanner from '../components/GuildBanner';
import GuildsDetails from '../components/GuildDetails';
import GuildNav from '../components/GuildNav';
import GuildGotchis from '../components/GuildGotchis';
import GuildLendings from '../components/GuildLendings';
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
        setGuildId
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

    return (
        <>
            <Box className={classes.guildWrapper}>

                <div className={classes.guildSidebar}>
                    <GuildBanner />
                    {<GuildsDetails guild={guildsData[guildId]} />}

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
                        <Route path={`${match.path}/gotchis`} component={GuildGotchis} />
                        <Route path={`${match.path}/lendings`} component={GuildLendings} />
                        <Route path={`${match.path}/realm`} component={ GuildsRealm } />
                        <Redirect from={match.path} to={`${match.path}/gotchis`} />
                    </Switch>
                </Box>
            </Box>
        </>
    )
}
