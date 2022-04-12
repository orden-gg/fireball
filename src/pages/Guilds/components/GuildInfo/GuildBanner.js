import React, { useContext } from 'react';
import { IconButton, Tooltip, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useHistory } from 'react-router-dom';

import GuildLogo from '../GuildLogo';
import GuildSocials from './GuildSocials';
import { GuildsContext } from 'pages/Guilds/GuildsContext';
import commonUtils from 'utils/commonUtils';
import defaultBanner from 'assets/images/guilds/ordenGG-banner.png';

import { guildBanner } from '../../styles';

export default function GuildBanner() {
    const classes = guildBanner();
    const { currentGuild, setCurrentGuild, guildsData } = useContext(GuildsContext);
    const history = useHistory();

    const changeGuild = direction => {
        const guildId = guildsData.indexOf(currentGuild)+direction;
        const guild = guildsData[guildId];

        if(guild === undefined || guild.members.length === 0) {
            return;
        }

        history.push(`/guilds/${commonUtils.stringToKey(guild.name)}`);

        setCurrentGuild(guild);
    }

    return (
        <div className={classes.guildBanner} >
            <div className={classes.guildBannerInner}>
                <div
                    style={{backgroundImage: `url(${currentGuild.banner || defaultBanner})`}}
                    className={classes.guildBannerBg}
                ></div>
                <div className={classes.guildLogo}>
                    <GuildLogo logo={currentGuild.logo} className={classes.guildLogoImage} />
                </div>
                <Typography component='h1' className={classes.guildName}>
                    {currentGuild.name}
                </Typography>
                <Tooltip
                    title='Previous guild'
                    placement='top'
                    followCursor
                >
                    <IconButton onClick={() => changeGuild(-1)} className={classes.buttonPrev}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip
                    title='Next guild'
                    placement='top'
                    followCursor
                >
                    <IconButton onClick={() => changeGuild(1)} className={classes.buttonNext} >
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Tooltip>
            </div>
            <GuildSocials />
        </div>
    );
}
