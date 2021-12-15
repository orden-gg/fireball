import React, { useContext } from 'react';
import { guildBanner } from '../../styles';
// import ScrollAnimation from 'react-animate-on-scroll';
// import guildUtils from '../../../../../utils/guildUtils';
import { IconButton, Link, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import classNames from 'classnames';
import { GuildsContext } from '../../../../contexts/GuildsContext';

import { ReactComponent as DiscordIcon } from '../../../../assets/images/discord.svg';
import { ReactComponent as TwitchIcon } from '../../../../assets/images/svgs/twitch.svg';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import TelegramIcon from '@mui/icons-material/Telegram';
import WebIcon from '@mui/icons-material/Web';

export default function GuildBanner() {
    const classes = guildBanner();
    const { guildData, guildGotchis, Placeholder } = useContext(GuildsContext);

    const getImage = (guild) => {
        if(guild.logo) return <img src={ guild.logo } className={classes.guildLogoImage} />

        return <Placeholder className={classNames(classes.guildLogoImage, classes.guildLogoPlaceholder)} />
    }

    const addSocial = (name) => {
        console.log(name);
        switch (name) {
            case 'facebook':
                return <FacebookIcon />
                break;
            case 'twitter':
                return <TwitterIcon />
                break;
            case 'discord':
                return <DiscordIcon />
                break;
            case 'telegram':
                return <TelegramIcon />
                break;
            case 'twitch':
                return <TwitchIcon />
                break;
            default:
                return <WebIcon />
                break;
        }
    }

    const renderSocials = () => {
        return (
            Object.keys(guildData.socials).map( (key) => (
                <Tooltip
                    title={key} 
                    classes={{ tooltip: classes.customTooltip }} 
                    placement='top'
                    followCursor
                >
                    <IconButton
                        key={key}
                        component={Link}
                        href={guildData.socials[key]}
                        target='_blank'
                        className={classes.guildSocialButton}
                    >
                        {addSocial(key)}
                    </IconButton>
                </Tooltip>
            ))
        )
    }

    return (
        <Box className={classNames(classes.guildBanner, guildData.banner.length && classes.guildBannerIs ) } style={{ backgroundImage: `url(${guildData.banner})` }}>
            <div className={classes.guildBannerInner}>
                <div className={classes.guildBannerTop}>
                    <Typography className={classNames(classes.guildMembers, classes.guildBannerText)}>
                        Members
                        <span>
                            {guildData.members?.length ? `(${guildData.members.length})` : '...'}
                        </span>
                    </Typography>
                    
                    <div className={classes.guildLogo}>{getImage(guildData)}</div>

                    <Typography className={classNames(classes.guildGotchis, classes.guildBannerText)}>
                        <span>
                            {guildGotchis?.length ? `(${guildGotchis.length})` : '...'}
                        </span>
                        Gotchis
                    </Typography>
                </div>
                <Typography component='h1' className={classes.guildName}>{guildData?.name}</Typography>
            </div>

            <div className={classes.guildSocials}>
                {renderSocials()}
            </div>
        </Box>
    );
}
