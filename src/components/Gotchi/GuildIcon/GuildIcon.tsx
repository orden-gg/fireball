import { Avatar } from '@mui/material';

import { CustomTooltip } from 'components/custom/CustomTooltip';
import { GotchiverseUtils } from 'utils';
import { styles } from './styles';

export function GuildIcon({ guild }) {
    const classes = styles();

    return (
        <div className={classes.guild}>
            <CustomTooltip
                title={GotchiverseUtils.getGuildName(guild)}
                placement='top'
                followCursor
            >
                <Avatar
                    className={classes.guildAvatar}
                    src={GotchiverseUtils.getGuildImg(guild)}
                />
            </CustomTooltip>
        </div>
    )
}
