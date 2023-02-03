import { Avatar } from '@mui/material';

import { CustomTooltip } from 'components/custom/CustomTooltip';
import { GotchiverseUtils } from 'utils';

import { styles } from './styles';

export function GuildIcon({ guildName }: { guildName: string }) {
  const classes = styles();

  return (
    <div className={classes.guild}>
      <CustomTooltip title={GotchiverseUtils.getGuildName(guildName)} placement='top' followCursor>
        <Avatar className={classes.guildAvatar} src={GotchiverseUtils.getGuildImg(guildName)} />
      </CustomTooltip>
    </div>
  );
}
