import React, { useContext, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { Box } from '@mui/system';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button, Skeleton, Tooltip } from '@mui/material';

import commonUtils from 'utils/commonUtils';
import gotchi from 'assets/images/gotchi-placeholder.svg';
import fud from 'assets/images/icons/fud.png';
import GuildLogo from '../components/GuildLogo';
import { GuildsContext } from '../GuildsContext';

import styles from '../styles';
import WearableImage from 'components/Items/Wearable/WearableImage';

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

    const renderList = () => {
        return (
            guildsData.map((guild, index) => (
                <Button
                    className={classes.guildButton}
                    disabled={!guild.members?.length}
                    key={index}
                    onClick={() => {handleClick(guild)}}
                >
                    {
                        guild.wearableId && (
                            <WearableImage className={classes.guildWearable} wearable={{id: guild.wearableId}} />
                        )
                    }
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
