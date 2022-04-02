import React, { useContext, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { Box } from '@mui/system';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { GuildsContext } from 'contexts/GuildsContext';
import commonUtils from 'utils/commonUtils';

import GuildLogo from '../components/GuildLogo';
import styles from '../styles';

export default function GuildsPreview() {
    const classes = styles();
    const { guildsData, setCurrentGuild } = useContext(GuildsContext);
    const match = useRouteMatch();
    const history = useHistory();

    const handleClick = (guild) => (event) => {
        history.push(`${match.url}/${commonUtils.stringToKey(guild.name)}`)
    }

    const renderList = () => {
        return (
            guildsData.sort( guild => guild.members.length ? -1 : 1).map((guild, index) => {
                return (
                    <div className={classes.guildItem} key={index}>
                        <button
                            className={classes.guildButton}
                            disabled={!guild.members?.length}
                            onClick={ handleClick(guild) }
                        >
                            <div className={classes.guildLogo}>
                                <GuildLogo logo={guild.logo} className={classes.guildLogoImage} />
                            </div>

                            <p className={classes.guildName}>{guild.name}</p>
                        </button>
                    </div>
                )
            })
        )
    }

    useEffect(() => {
        setCurrentGuild([]);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] );

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
                { renderList() }
            </ul>
        </Box>
    );
}
