import { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IconButton, Tooltip, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { GuildsContext } from 'pages/Guilds/GuildsContext';
import commonUtils from 'utils/commonUtils';
import defaultBanner from 'assets/images/guilds/default-banner.png';

import GuildLogo from './GuildLogo';
import GuildSocials from './GuildSocials';
import { guildBanner } from '../styles';

export function GuildBanner() {
    const classes = guildBanner();

    const history = useHistory();

    const { guildId, setGuildId, guilds } = useContext<any>(GuildsContext);

    const [guild, setGuild] = useState<any>({});

    const onGuildChange = useCallback((currentGuildId: any) => {
        const nextGuild: any = guilds[currentGuildId];

        if (nextGuild === undefined || nextGuild.members?.length === 0) {
            return;
        }

        history.push(`/guilds/${commonUtils.stringToKey(nextGuild.name)}`);
        setGuildId(currentGuildId);
    }, [guilds, history, setGuildId]);

    const getBannerUrl = (): string => {
        try {
            return require(`assets/images/guilds/${guild.banner}`).default;
        } catch (error) {
            return defaultBanner;
        }
    };

    useEffect(() => {
        if (guildId !== null) {
            setGuild(guilds[guildId]);
        }
    }, [guilds, guildId]);

    return (
        <div className={classes.guildBanner} >
            <div className={classes.guildBannerInner}>
                <div
                    style={{ backgroundImage: `url(${getBannerUrl()})` }}
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
                    <IconButton onClick={() => onGuildChange(guildId - 1)} className={classes.buttonPrev}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip
                    title='Next guild'
                    placement='top'
                    followCursor
                >
                    <IconButton onClick={() => onGuildChange(guildId + 1)} className={classes.buttonNext} >
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Tooltip>
            </div>
            <GuildSocials />
        </div>
    );
}
