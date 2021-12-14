import React, { useContext } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import styles from '../styles';
// import ScrollAnimation from 'react-animate-on-scroll';
import { GuildsContext } from '../../../contexts/GuildsContext';
import { Button, Link } from '@mui/material';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Box } from '@mui/system';
import guildUtils from '../../../utils/guildUtils';

export default function GuildsPreview() {
    const classes = styles();
    const { guildsData, Placeholder } = useContext(GuildsContext);
    const match = useRouteMatch();
    const history = useHistory();

    const getImage = (guild) => {
        if(guild.logo) return <img src={ guild.logo } className={classes.guildLogoImage} />

        return <Placeholder className={classNames(classes.guildLogoImage, classes.guildLogoPlaceholder)} />
    }

    const handleClick = (guild) => (event) => {
        console.log(`${match.url}/${guildUtils.nameToPath(guild.name)}`);
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
                            <div className={classes.guildLogo}>{getImage(guild)}</div>
                            
                            <p className={classes.guildName}>{guild.name}</p>
                        </button>
                    </div>
                )
            })
        )
    }

    return (
        <Box className={classes.guildsWrapper}>
            <h1 className={classes.guildsTitle}>Aavegotchi Guilds</h1>
            <ul className={classes.guildsList}>
                { renderList() }
            </ul>
        </Box>
    );
}
