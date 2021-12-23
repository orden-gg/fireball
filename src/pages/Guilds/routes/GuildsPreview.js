import React, { useContext, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import styles from '../styles';
// import ScrollAnimation from 'react-animate-on-scroll';
import { GuildsContext } from '../../../contexts/GuildsContext';
import { Box } from '@mui/system';
import guildUtils from '../../../utils/guildUtils';
import GuildLogo from '../components/GuildLogo';

export default function GuildsPreview() {
    const classes = styles();
    const { guildsData, setCurrentGuild } = useContext(GuildsContext);
    const match = useRouteMatch();
    const history = useHistory();

    const handleClick = (guild) => (event) => {
        history.push(`${match.url}/${guildUtils.nameToPath(guild.name)}`)
    }

    const renderList = () => {
        return (
            guildsData.map( (guild, index) => {
                return (
                    <div className={classes.guildItem} key={index}>
                        <button
                            className={classes.guildButton}
                            disabled={!guild.members?.length && !guild.description?.length}
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

    useEffect( () => {
        setCurrentGuild([]);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] );

    return (
        <Box className={classes.guildsWrapper}>
            <h1 className={classes.guildsTitle}>Aavegotchi Guilds</h1>
            <ul className={classes.guildsList}>
                { renderList() }
            </ul>
        </Box>
    );
}
