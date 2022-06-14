import { Avatar } from '@mui/material';
import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined';

import { CustomTooltip } from 'components/custom/CustomTooltip';
import itemUtils from 'utils/itemUtils';
import gotchiverseUtils from 'utils/gotchiverseUtils';

import GotchiSvgByStats from './GotchiSvgByStats';
import GotchiSvg from './GotchiSvg';
import styles from './styles';

export default function GotchiImage({ gotchi, renderSvgByStats, portal }) {
    const classes = styles();

    return (
        <div className={classes.gotchiSvg}>
            <span className={classes.gotchiHaunt}>h{gotchi.hauntId}</span>
            {portal ? (
                <img
                    className={classes.gotchiSvgPortal}
                    src={itemUtils.getPortalImg(gotchi.hauntId)}
                    alt={`haunt-${gotchi.hauntId}-portal`}
                    width='100%' />
            ) : (
                null
            )}
            {
                renderSvgByStats ? (
                    <GotchiSvgByStats gotchi={gotchi} size='100%' />
                ) : (
                    <GotchiSvg id={gotchi.id} size='100%' />
                )
            }
            {
                gotchi.whitelistId && <div className={classes.whitelist}>
                    <PlaylistAddCheckOutlinedIcon
                        className={classes.icon}
                        fontSize='small'
                    />
                    {gotchi.whitelistId}
                </div>
            }
            {
                gotchi.guild && <div className={classes.guild}>
                    <CustomTooltip
                        title={gotchiverseUtils.getGuildName(gotchi.guild)}
                        placement='top'
                        followCursor
                    >
                        <Avatar
                            className={classes.guildAvatar}
                            src={gotchiverseUtils.getGuildImg(gotchi.guild)}
                        />
                    </CustomTooltip>
                </div>
            }
        </div>
    );
}
