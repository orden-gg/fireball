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
import classNames from 'classnames';
import guildUtils from '../../../utils/guildUtils';

export default function Guild({backToGuilds}) {
    const [ isLoading, setIsLoading ] = useState(true);
    const params = useParams();
    const classes = guildStyles();
    const history = useHistory();
    
    const { 
        guildsData,
        guildData,
        allGotchis, setAllGotchis,
        setGuildData,
        guildGotchis,
        Placeholder
    } = useContext(GuildsContext);
    

    const [ isOpen, setIsOpen ] = useState(true);

    // const getGuildGotchis = (gotchisData) => {
        
    //     if(!allGotchis.length) getAllGotchis();
    //     else filterGuildGotchis(allGotchis);
    // };

    const getImage = (guild) => {
        if(guild.logo) return <img src={ guild.logo } className={classNames(classes.backdropImage, !isLoading && 'out')} />

        return <Placeholder className={classNames(classes.backdropImage, classes.backdropImagePlaceholder, !isLoading && 'out')} />
    }

    const getAllGotchis = () => {
        thegraph.getAllGotchies().then((response) => {
            setAllGotchis(response);
        }).catch((e)=> {
            console.log(e);
        });
    };

    useEffect( () => {
        let guild = guildsData.find( guild => (
            guildUtils.nameToPath(guild.name) === params.name
        ));

        if( guild === undefined || !guild.members?.length ) return backToGuilds();

        setGuildData(guild);

        if(!allGotchis.length) getAllGotchis();
    }, []);

    useEffect( () => {
        if(!isLoading) setTimeout( () => {
            setIsOpen(false);
        }, 500);
    }, [isLoading]);


    useEffect( () => {
        if(guildGotchis.length) setIsLoading(false);
    }, [guildGotchis]);

    return (
        <>
            <Backdrop className={classes.backdrop} open={isOpen}>
                <div className={classes.backdropBox}>
                    {getImage(guildData)}
                </div>
            </Backdrop>
            {
                !isOpen && (
                    <Box className={classes.guildWrapper}> 
                        <IconButton className={classes.backButton} onClick={ () => {history.goBack()}} >
                            <ArrowBackIcon />
                        </IconButton>
                    
                        {/* <GuildsInfo {...{guild}} gotchis={guildGotchis} /> */}
                        <GuildBanner />
                        <GuildsDetails />
                        <GuildsGotchis />
                    </Box>
                )
            }
        </>
    );
}
