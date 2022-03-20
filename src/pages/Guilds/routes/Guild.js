import React, { useContext, useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router';
import { Backdrop, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import thegraph from 'api/thegraph';
import { GuildsContext } from 'contexts/GuildsContext';
import guildUtils from 'utils/guildUtils';

import GuildGotchis from '../components/GuildGotchis';
import GuildBanner from '../components/GuildInfo/GuildBanner';
import GuildsDetails from '../components/GuildInfo/GuildDetails';
import GuildLogo from '../components/GuildLogo';
import GuildNav from '../components/GuildNav';
import GuildsRealm from '../components/GuildsRealm';
import { guildStyles } from '../styles';

export default function Guild({backToGuilds}) {
    const [isLoading, setIsLoading] = useState(true);

    const params = useParams();
    const classes = guildStyles();
    const history = useHistory();
    const match = useRouteMatch();

    const {
        guildsData,
        currentGuild,
        setCurrentGuild,
        guildGotchis, setGuildGotchis,
        setGuildRealm
    } = useContext(GuildsContext);

    const loadData = (b) => {
        loadGotchisByAddresses(currentGuild.members, b);
        loadRealmByAddresses(currentGuild.members, b);
    }

    const loadGotchisByAddresses = async (addresses, b) => {
        let gotchis = await thegraph.getGotchisByAddresses(addresses);

        if(b) return;

        gotchis.sort((a,b) => (
            b.modifiedRarityScore - a.modifiedRarityScore
        ));

        setGuildGotchis(gotchis);
    };

    const loadRealmByAddresses = async (addresses, b) => {
        let realm = await thegraph.getRealmByAddresses(addresses);

        if(b) return;

        setGuildRealm(realm);
    };

    useEffect( () => {
        let guild = guildsData.find( guild => (
            guildUtils.nameToPath(guild.name) === params.name
        ));

        if(
            guild === undefined ||
            (!guild.members?.length && !guild.description?.length)
        ) return backToGuilds();

        setCurrentGuild(guild);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect( () => {
        let controller = new AbortController();

        if(currentGuild.hasOwnProperty('name')) loadData(controller.signal.aborted);

        return () => controller?.abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentGuild]);

    useEffect( () => {
        if(currentGuild.hasOwnProperty('name')) setIsLoading(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ guildGotchis ]);

    return (
        <>
            <Backdrop className={classes.backdrop} open={isLoading}>
                <div className={classes.backdropBox}>
                    <GuildLogo logo={currentGuild.logo} className={classes.backdropImage} />
                </div>
            </Backdrop>
            {
                !isLoading && (
                    <Box className={classes.guildWrapper}>
                        <IconButton className={classes.backButton} onClick={ () => {history.push('/guilds')}} >
                            <ArrowBackIcon />
                        </IconButton>

                        <GuildBanner />

                        {!!currentGuild.description?.length &&  <GuildsDetails />}

                        <GuildNav />

                        <Box className={classes.guildContent}>
                            <Switch>
                                <Route path={`${match.path}/gotchis`} component={ GuildGotchis } />
                                <Route path={`${match.path}/realm`} component={ GuildsRealm } />
                                <Redirect from={match.path} to={`${match.path}/gotchis`} />
                            </Switch>
                        </Box>
                    </Box>
                )
            }
        </>
    );
}
