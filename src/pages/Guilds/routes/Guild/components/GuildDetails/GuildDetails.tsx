import { Typography } from '@mui/material';

import { Guild } from 'pages/Guilds/models';

import { guildDetailsStyles } from './styles';

export function GuildDetails({ guild }: { guild: Guild }) {
  const classes = guildDetailsStyles();

  return (
    <>
      <div className={classes.detailsWrapper}>
        <div className={classes.detailsBody}>
          <Typography className={classes.detailText}>{guild.description}</Typography>
        </div>
      </div>
    </>
  );
}
