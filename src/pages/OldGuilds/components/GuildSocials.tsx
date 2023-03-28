import { useContext } from 'react';

import FacebookIcon from '@mui/icons-material/Facebook';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import WebIcon from '@mui/icons-material/Web';
import { IconButton, Link, Tooltip } from '@mui/material';

import { DiscordIcon, TwitchIcon } from 'components/Icons/Icons';
import { GuildsContext } from 'pages/OldGuilds/GuildsContext';

import { guildSocialsStyles } from '../styles';

export function GuildSocials() {
  const classes = guildSocialsStyles();

  const { guildId, guilds } = useContext<CustomAny>(GuildsContext);

  const socials: CustomAny = {
    facebook: <FacebookIcon className={classes.guildSocialIcon} />,
    twitter: <TwitterIcon className={classes.guildSocialIcon} />,
    discord: <DiscordIcon className={classes.guildSocialIcon} />,
    telegram: <TelegramIcon className={classes.guildSocialIcon} />,
    twitch: <TwitchIcon className={classes.guildSocialIcon} />,
    default: <WebIcon className={classes.guildSocialIcon} />
  };

  const renderSocials = (): JSX.Element | JSX.Element[] => {
    const guild: CustomAny = guilds[guildId];

    if (guild === undefined || !guild.hasOwnProperty('socials')) {
      return <></>;
    }

    return Object.keys(guild.socials).map((key) => (
      <Tooltip title={key} key={key} placement='top' followCursor>
        <IconButton component={Link} href={guild.socials[key]} target='_blank' className={classes.guildSocialButton}>
          {socials[key] || socials.default}
        </IconButton>
      </Tooltip>
    ));
  };

  return <div className={classes.guildSocials}>{renderSocials()}</div>;
}
