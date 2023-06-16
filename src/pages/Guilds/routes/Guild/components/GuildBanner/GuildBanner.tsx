import { Button, Link, Typography } from '@mui/material';

import { GuildLogo } from 'pages/Guilds/components';
import { Guild } from 'pages/Guilds/models';

import { GnosisIcon } from 'components/Icons/Icons';

import defaultBanner from 'assets/images/guilds/default-banner.png';

import { guildBannerStyles } from './styles';

export function GuildBanner({ guild }: { guild: Guild }) {
  const classes = guildBannerStyles();

  const guildsSafeUrl = `https://app.safe.global/home?safe=matic:${guild.safeAddress}`;

  const getBannerUrl = (): string => {
    try {
      return require(`assets/images/guilds/${guild.logo}`).default;
    } catch (error) {
      return defaultBanner;
    }
  };

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
        <Link
          href={guildsSafeUrl}
          target='_blank'
          underline='none'
          component={Button}
          endIcon={<GnosisIcon width={20} height={20} />}
          className={classes.guildTreasuryButton}
          size='small'
        >
          Guild Treasury
        </Link>
      </div>
    </div>
  );
}
