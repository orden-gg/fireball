import React, { useContext } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import styles from '../styles';
// import ScrollAnimation from 'react-animate-on-scroll';
import { GuildsContext } from '../../../contexts/GuildsContext';
import { Link } from '@mui/material';
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
        if(!guild.members?.length) event.stopPropagation();
        else history.push(`${match.url}/${guildUtils.nameToPath(guild.name)}`)
    }

    const renderList = () => {
        return (
            guildsData.map( (guild, index) => {
                return (
                    // <ScrollAnimation animateIn="fadeIn">
                        <div className={classes.guildItem} key={index}>
                            <Link
                                // to={{ pathname: `${match.url}/${guildUtils.nameToPath(guild.name)}` }}
                                // component={NavLink}
                                className={classes.guildLink}
                                component="button"
                                disabled={!guild.members?.length}
                                onClick={ handleClick(guild) }
                            >
                                <div className={classes.guildLogo}>{getImage(guild)}</div>
                                
                                <p className={classes.guildName}>{guild.name}</p>
                            </Link>
                        </div>
                    // </ScrollAnimation>
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
