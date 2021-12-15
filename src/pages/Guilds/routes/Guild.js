import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import thegraph from '../../../api/thegraph';
import '../styles.css';
// import GuildsInfo from '../components/GuildInfo/GuildInfo';
import GuildsGotchis from '../components/GuildGotchis';
import GuildBanner from '../components/GuildInfo/GuildBanner';
import GuildsDetails from '../components/GuildInfo/GuildDetails';
import { GuildsContext } from '../../../contexts/GuildsContext';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { guildStyles } from '../styles';

import { Backdrop, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import guildUtils from '../../../utils/guildUtils';
import GuildLogo from '../components/GuildLogo';

export default function Guild({backToGuilds}) {
    const [ isLoading, setIsLoading ] = useState(true);

    const params = useParams();
    const classes = guildStyles();
    const history = useHistory();
    
    const { 
        guildsData,
        currentGuild,
        setCurrentGuild,
        guildGotchis, setGuildGotchis
    } = useContext(GuildsContext);

    const setGotchisByAddresses = async (addresses) => {
        let gotchis = await thegraph.getGotchisByAddresses(addresses);

        gotchis.sort((a,b) => (
            b.modifiedRarityScore - a.modifiedRarityScore
        ));

        setGuildGotchis(gotchis);
    };

    useEffect( () => {
        let guild = guildsData.find( guild => (
            guildUtils.nameToPath(guild.name) === params.name
        ));

        if( 
            guild === undefined ||
            !guild.members?.length && !guild.description?.length
        ) return backToGuilds();

        setCurrentGuild(guild);
    }, []);

    useEffect( () => {
        if(currentGuild.hasOwnProperty('name')) setGotchisByAddresses(currentGuild.members);
    }, [currentGuild]);

    useEffect( () => {
        if(currentGuild.hasOwnProperty('name')) setIsLoading(false);
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
                        <IconButton className={classes.backButton} onClick={ () => {history.goBack()}} >
                            <ArrowBackIcon />
                        </IconButton>
                    
                        <GuildBanner />
                        {!!currentGuild.description?.length &&  <GuildsDetails />}
                        {!!guildGotchis.length && <GuildsGotchis />}
                    </Box>
                )
            }
        </>
    );
}
