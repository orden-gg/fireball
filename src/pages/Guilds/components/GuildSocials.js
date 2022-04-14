import React, { useContext } from 'react';
import { IconButton, Link, Tooltip } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import TelegramIcon from '@mui/icons-material/Telegram';
import WebIcon from '@mui/icons-material/Web';

import { DiscordIcon, TwitchIcon } from 'components/Icons/Icons';
import { GuildsContext } from 'pages/Guilds/GuildsContext';

import { guildSocialsStyles } from '../styles';

export default function GuildSocials() {
    const classes = guildSocialsStyles();
    const { guildId, guildsData } = useContext(GuildsContext);
    const socials = {
        facebook: <FacebookIcon className={classes.guildSocialIcon} />,
        twitter: <TwitterIcon className={classes.guildSocialIcon} />,
        discord: <DiscordIcon className={classes.guildSocialIcon} />,
        telegram: <TelegramIcon className={classes.guildSocialIcon} />,
        twitch: <TwitchIcon className={classes.guildSocialIcon} />,
        default: <WebIcon className={classes.guildSocialIcon} />
    }

    const renderSocials = () => {
        const guild = guildsData[guildId];

        if (guild === undefined || !guild.hasOwnProperty('socials')) {
            return null;
        };

        return (
            Object.keys(guild.socials).map(key => (
                <Tooltip
                    title={key}
                    key={key}
                    placement='top'
                    followCursor
                >
                    <IconButton
                        component={Link}
                        href={guild.socials[key]}
                        target='_blank'
                        className={classes.guildSocialButton}
                    >
                        {socials[key] || socials.default}
                    </IconButton>
                </Tooltip>
            ))
        );
    }

    return <div className={classes.guildSocials}>
        {renderSocials()}
    </div>
}
