import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IconButton, Tooltip, Typography } from '@mui/material';

import { GuildsContext } from 'pages/OldGuilds/GuildsContext';
import { CommonUtils } from 'utils';

import defaultBanner from 'assets/images/guilds/default-banner.png';

import { guildBanner } from '../styles';
import { GuildLogo } from './GuildLogo';
import { GuildSocials } from './GuildSocials';

export function GuildBanner() {
  const classes = guildBanner();

  const navigate = useNavigate();

  const { guildId, setGuildId, guilds } = useContext<CustomAny>(GuildsContext);

  const [guild, setGuild] = useState<CustomAny>({});

  const onGuildChange = useCallback(
    (currentGuildId: CustomAny) => {
      const nextGuild: CustomAny = guilds[currentGuildId];

      if (nextGuild === undefined || nextGuild.members?.length === 0) {
        return;
      }

      navigate(`/guilds/${CommonUtils.stringToKey(nextGuild.name)}`);
      setGuildId(currentGuildId);
    },
    [guilds, navigate, setGuildId]
  );

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
          <IconButton onClick={() => onGuildChange(guildId - 1)} className={classes.buttonPrev}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Next guild' placement='top' followCursor>
          <IconButton onClick={() => onGuildChange(guildId + 1)} className={classes.buttonNext}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Tooltip>
      </div>
      <GuildSocials />
    </div>
  );
}
