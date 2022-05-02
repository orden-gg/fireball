import React, { useContext, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { Box } from '@mui/system';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button, Tooltip } from '@mui/material';

import { FudIcon, GhstTokenIcon, GotchiIcon, LendingIcon, WarehouseIcon } from 'components/Icons/Icons';
import GuildLogo from '../components/GuildLogo';
import GuildWearables from '../components/GuildWearables';
import { GuildsContext } from '../GuildsContext';
import commonUtils from 'utils/commonUtils';

import styles from '../styles';

export default function GuildsPreview() {
    const classes = styles();
    const {
        guilds,
        setGuildId
    } = useContext(GuildsContext);
    const match = useRouteMatch();
    const history = useHistory();

    const handleClick = (guild) => {
        history.push(`${match.url}/${commonUtils.stringToKey(guild.name)}`);
    }

    // TODO Use in the future or remove
    // const setNumber = amount => {
    //     if (amount !== undefined) {
    //         return amount
    //     } else {
    //         return <Skeleton  animation="wave" variant="text" className={classes.guildInfoAmountLoader} />;
    //     }
    // }

    const renderWaerables = guild => {
        if (guild.hasOwnProperty('wearables')) {

            return <GuildWearables
                wearables={guild.wearables}
                className={classes.guildWearable}
                tooltip='Guild wearable'
            />
        }
    }

    useEffect(() => {
        setGuildId(null);
    }, [setGuildId]);

    return (
        <Box className={classes.guildsWrapper}>
            <a
                className={classes.guildsTitle}
                href='https://fireball-gg.notion.site/How-to-add-guild-to-fireball-gg-a2bec3bd315c4d42961bc0148bb17c26'
                target='_blank'
                rel='noreferrer'
            >
                <span>how to add your guild</span>
                <ArrowForwardIcon fontSize='small' />
            </a>
            <ul className={classes.guildsList}>
                {
                    guilds.map((guild, id) => (
                        <Button
                            className={classes.guildButton}
                            disabled={!guild.members?.length}
                            key={id}
                            onClick={() => {handleClick(guild)}}
                        >
                            <div className={classes.guildLogo}>
                                <GuildLogo logo={guild.logo} className={classes.guildLogoImage} />
                            </div>
                            <div className={classes.guildBody}>
                                <p className={classes.guildName}>{guild.name}</p>
                                <ul className={classes.guildInfoList}>
                                    <Tooltip title='Gotchis' followCursor placement='top'>
                                        <li className={classes.guildInfoItem}>
                                            <GotchiIcon className={classes.guildInfoItemIcon} />
                                            <span className={classes.guildInfoAmount}>
                                                -
                                            </span>
                                        </li>
                                    </Tooltip>
                                    <Tooltip title='Lendings' followCursor placement='top'>
                                        <li className={classes.guildInfoItem}>
                                            <LendingIcon className={classes.guildInfoItemIcon} />
                                            <span className={classes.guildInfoAmount}>
                                                -
                                            </span>
                                        </li>
                                    </Tooltip>
                                    <Tooltip title='Wearables' followCursor placement='top'>
                                        <li className={classes.guildInfoItem}>
                                            <WarehouseIcon className={classes.guildInfoItemIcon} />
                                            <span className={classes.guildInfoAmount}>
                                                -
                                            </span>
                                        </li>
                                    </Tooltip>
                                    <Tooltip title='Realm' followCursor placement='top'>
                                        <li className={classes.guildInfoItem}>
                                            <FudIcon className={classes.guildInfoItemIcon} />
                                            <span className={classes.guildInfoAmount}>
                                                -
                                            </span>
                                        </li>
                                    </Tooltip>
                                    <Tooltip title='Voting power' followCursor placement='top'>
                                        <li className={classes.guildInfoItem}>
                                            <GhstTokenIcon className={classes.guildInfoItemIcon} />
                                            <span className={classes.guildInfoAmount}>
                                                -
                                            </span>
                                        </li>
                                    </Tooltip>
                                </ul>
                                <div className={classes.guildWearables}>
                                    {renderWaerables(guild)}
                                </div>
                            </div>
                        </Button>
                    ))
                }
            </ul>
        </Box>
    );
}
