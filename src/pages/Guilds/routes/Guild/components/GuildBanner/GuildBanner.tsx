import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IconButton, Tooltip, Typography } from '@mui/material';

import { GuildLogo } from 'pages/Guilds/components';
import { GuildSocials } from 'pages/OldGuilds/components/GuildSocials';

import { CommonUtils } from 'utils';

import guilds from 'data/guilds.json';

import defaultBanner from 'assets/images/guilds/default-banner.png';

import { guildBannerStyles } from './styles';

export function GuildBanner() {
  const classes = guildBannerStyles();

  const navigate = useNavigate();

  const [guild, setGuild] = useState<CustomAny>({});

  const onGuildChange = useCallback(
    (currentGuildId: CustomAny) => {
      const nextGuild: CustomAny = guilds[currentGuildId];

      if (nextGuild === undefined || nextGuild.members?.length === 0) {
        return;
      }

      navigate(`/guilds/${CommonUtils.stringToKey(nextGuild.name)}`);
    },
    [guilds, navigate]
  );

  const getBannerUrl = (): string => {
    try {
      return require(`assets/images/guilds/${guild.banner}`).default;
    } catch (error) {
      return defaultBanner;
    }
  };

  useEffect(() => {
    setGuild(guilds[0]);
  }, [guilds]);

  return (
    <div className={classes.guildBanner}>
      <div className={classes.guildBannerInner}>
        <div style={{ backgroundImage: `url(${getBannerUrl()})` }} className={classes.guildBannerBg}></div>
        <div className={classes.guildLogo}>
          <GuildLogo logo={guild.logo} className={classes.guildLogoImage} />
        </div>
        <Typography component='h1' className={classes.guildName}>
          {guild.name}
        </Typography>
        <Tooltip title='Previous guild' placement='top' followCursor>
          <IconButton onClick={() => onGuildChange(0)} className={classes.buttonPrev}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Next guild' placement='top' followCursor>
          <IconButton onClick={() => onGuildChange(1)} className={classes.buttonNext}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Tooltip>
      </div>
      <GuildSocials />
    </div>
  );
}
