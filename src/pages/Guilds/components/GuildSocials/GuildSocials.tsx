import { IconButton, Link, Tooltip } from '@mui/material';

import { IconName } from 'shared/constants';

import { IconUtils } from 'utils';

import { guildSocialsStyles } from './styles';

export function GuildSocials({ socials }: CustomAny) {
  const classes = guildSocialsStyles();

  return (
    <div className={classes.guildSocials}>
      {Object.keys(socials).map((key: string) => (
        <Tooltip title={key} key={key} placement='top' followCursor>
          <IconButton component={Link} href={socials[key]} target='_blank' className={classes.guildSocialButton}>
            {IconUtils.getIconByName(key as IconName, {
              width: 20,
              height: 20,
              className: classes.guildSocialIcon
            }) ||
              IconUtils.getIconByName('web' as IconName, {
                width: 20,
                height: 20,
                className: classes.guildSocialIcon
              })}
          </IconButton>
        </Tooltip>
      ))}
    </div>
  );
}
