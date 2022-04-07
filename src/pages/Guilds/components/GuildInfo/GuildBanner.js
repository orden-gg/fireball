import React, { useContext } from 'react';
import { IconButton, Link, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import TelegramIcon from '@mui/icons-material/Telegram';
import WebIcon from '@mui/icons-material/Web';

import classNames from 'classnames';

import { GuildsContext } from 'pages/Guilds/GuildsContext';
import { ReactComponent as DiscordIcon } from 'assets/images/icons/discord.svg';
import { ReactComponent as TwitchIcon } from 'assets/images/icons/twitch.svg';

import GuildLogo from '../GuildLogo';
import { guildBanner } from '../../styles';

export default function GuildBanner() {
    const classes = guildBanner();
    const { currentGuild } = useContext(GuildsContext);
    const socials = {
        facebook: <FacebookIcon className={classes.guildSocialIcon} />,
        twitter: <TwitterIcon className={classes.guildSocialIcon} />,
        discord: <DiscordIcon className={classes.guildSocialIcon} />,
        telegram: <TelegramIcon className={classes.guildSocialIcon} />,
        twitch: <TwitchIcon className={classes.guildSocialIcon} />,
        default: <WebIcon className={classes.guildSocialIcon} />
    }

    const renderSocials = () => {
        if (!currentGuild.hasOwnProperty('socials')) {
            return null;
        };

        return (
            Object.keys(currentGuild.socials).map(key => (
                <Tooltip
                    title={key}
                    key={key}
                    placement='top'
                    followCursor
                >
                    <IconButton
                        component={Link}
                        href={currentGuild.socials[key]}
                        target='_blank'
                        className={classes.guildSocialButton}
                    >
                        {socials[key] || socials.default}
                    </IconButton>
                </Tooltip>
            ))
        );
    }

    return (
        <Box
            className={
                classNames(
                    classes.guildBanner,
                    currentGuild.banner?.length && classes.guildBannerIs
                )
            }
            style={{backgroundImage: `url(${currentGuild.banner})`}}
        >
            <div className={classes.guildBannerInner}>
                <div className={classes.guildBannerTop}>
                    <Typography className={classNames(classes.guildMembers, classes.guildBannerText)}>
                        Members
                        <span>
                            {currentGuild.members?.length ? `(${currentGuild.members.length})` : '...'}
                        </span>
                    </Typography>

                    <div className={classes.guildLogo}>
                        <GuildLogo logo={currentGuild.logo} className={classes.guildLogoImage} />
                    </div>

                    <Typography className={classNames(classes.guildGotchis, classes.guildBannerText)}>
                        {renderSocials()}
                    </Typography>
                </div>
                <Typography component='h1' className={classes.guildName}>{currentGuild?.name}</Typography>
            </div>
        </Box>
    );
}
