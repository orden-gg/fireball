import React, { useContext, useEffect, useState } from 'react';
import { IconButton, Tooltip, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useHistory } from 'react-router-dom';

import GuildLogo from './GuildLogo';
import GuildSocials from './GuildSocials';
import { GuildsContext } from 'pages/Guilds/GuildsContext';
import commonUtils from 'utils/commonUtils';
import defaultBanner from 'assets/images/guilds/default-banner.png';

import { guildBanner } from '../styles';

export default function GuildBanner() {
    const classes = guildBanner();
    const { guildId, setGuildId, guildsData } = useContext(GuildsContext);
    const history = useHistory();
    const [guild, setGuild] = useState([]);

    const changeGuild = direction => {
        const id = guildId+direction;
        const nextGuild = guildsData[id];

        if (nextGuild === undefined || nextGuild.members?.length === 0) {
            return;
        }

        history.push(`/guilds/${commonUtils.stringToKey(nextGuild.name)}`);

        setGuildId(id);
    }

    const getBannerUrl = () => {
        try {
            return require(`assets/images/guilds/${guild.banner}`).default;
        } catch (error) {
            return defaultBanner;
        }
    }

    useEffect(() => {
        if(guildId !== null) {
            setGuild(guildsData[guildId]);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [guildId]);

    return (
        <div className={classes.guildBanner} >
            <div className={classes.guildBannerInner}>
                <div
                    style={{backgroundImage: `url(${getBannerUrl()})`}}
                    className={classes.guildBannerBg}
                ></div>
                <div className={classes.guildLogo}>
                    <GuildLogo logo={guild.logo} className={classes.guildLogoImage} />
                </div>
                <Typography component='h1' className={classes.guildName}>
                    {guild.name}
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
