import React, { useContext, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { Box } from '@mui/system';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button, Skeleton, Tooltip } from '@mui/material';

import GuildLogo from '../components/GuildLogo';
import GuildWearables from '../components/GuildWearables';
import { GuildsContext } from '../GuildsContext';
import commonUtils from 'utils/commonUtils';
import gotchi from 'assets/images/gotchi-placeholder.svg';
import fud from 'assets/images/icons/fud.png';

import styles from '../styles';

export default function GuildsPreview() {
    const classes = styles();
    const { guildsData, setCurrentGuild } = useContext(GuildsContext);
    const match = useRouteMatch();
    const history = useHistory();

    const handleClick = (guild) => {
        history.push(`${match.url}/${commonUtils.stringToKey(guild.name)}`);
    }

    const setNumber = items => {
        if (items !== undefined) {
            return items.length
        }

        return <Skeleton  animation="wave" variant="text" className={classes.guildInfoAmountLoader} />;
    }

    const renderWaerables = guild => {
        if(guild.hasOwnProperty('wearables')) {

            return <GuildWearables
                wearables={guild.wearables}
                className={classes.guildWearable}
            />
        }
    }

    const renderList = () => {
        return (
            guildsData.map((guild, index) => (
                <Button
                    className={classes.guildButton}
                    disabled={!guild.members?.length}
                    key={index}
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
                                    <img src={gotchi} className={classes.guildInfoItemIcon} alt='gotchi icon' />
                                    <span className={classes.guildInfoAmount}>
                                        {setNumber(guild.gotchis)}
                                    </span>
                                </li>
                            </Tooltip>
                            <Tooltip title='Realm' followCursor placement='top'>
                                <li className={classes.guildInfoItem}>
                                    <img src={fud} className={classes.guildInfoItemIcon} alt='realm icon' />
                                    <span className={classes.guildInfoAmount}>
                                        {setNumber(guild.realm)}
                                    </span>
                                </li>
                            </Tooltip>
                        </ul>
                        <div className={classes.guildWearables}>{renderWaerables(guild)}</div>
                    </div>
                </Button>
            ))
        )
    }

    useEffect(() => {
        setCurrentGuild({});

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
            <ul className={classes.guildsList}>{renderList()}</ul>
        </Box>
    );
}
