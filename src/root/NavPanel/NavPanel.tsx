import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PersonIcon from '@mui/icons-material/Person';
import MapIcon from '@mui/icons-material/Map';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

import classNames from 'classnames';

import { GuildIcon, LendingIcon, CraftIcon } from 'components/Icons/Icons';
import { LoginContext } from 'contexts/LoginContext';

import { styles } from './styles';

export function NavPanel() {
    const classes = styles();

    const { activeAddress } = useContext<any>(LoginContext);
    const clientLink = activeAddress ? `/client/${activeAddress}` : 'client';

    return (
            <div className={classes.container}>
                <nav className={classes.navigation}>
                    <div className={classes.navItem}>
                        <NavLink className={classes.navLink} to={clientLink}>
                            <Icon className={classes.iconBox}>
                                <PersonIcon width={20} height={20} />
                            </Icon>
                            <span className={classes.navItemName}>Client</span>
                        </NavLink>
                    </div>
                    <div className={classes.navItem}>
                        <NavLink className={classes.navLink} to='/lend'>
                            <Icon className={classes.iconBox}>
                                <LendingIcon width={20} height={20} />
                            </Icon>
                            <span className={classes.navItemName}>Lend</span>
                        </NavLink>
                    </div>
                    <div className={classes.navItem}>
                        <NavLink className={classes.navLink} to='/market'>
                            <Icon className={classes.iconBox}>
                                <StoreIcon width={20} height={20} />
                            </Icon>
                            <span className={classes.navItemName}>Market</span>
                        </NavLink>
                    </div>
                    <div className={classes.navItem}>
                        <NavLink className={classes.navLink} to='/autopet'>
                            <Icon className={classes.iconBox}>
                                <AutorenewIcon width={20} height={20} />
                            </Icon>
                            <span className={classes.navItemName}>Autopet</span>
                        </NavLink>
                    </div>
                    <div className={classes.navItem}>
                        <NavLink className={classes.navLink} to='/guilds'>
                            <Icon className={classes.iconBox}>
                                <GuildIcon width={20} height={20} />
                            </Icon>
                            <span className={classes.navItemName}>Guilds</span>
                        </NavLink>
                    </div>
                    <div className={classes.navItem}>
                        <NavLink className={classes.navLink} to='/raffles'>
                            <Icon className={classes.iconBox}>
                                <ConfirmationNumberIcon width={20} height={20} />
                            </Icon>
                            <span className={classes.navItemName}>Raffles</span>
                        </NavLink>
                    </div>
                    <div className={classes.navItem}>
                        <NavLink className={classes.navLink} to='/map'>
                            <Icon className={classes.iconBox}>
                                <MapIcon width={20} height={20} />
                            </Icon>
                            <span className={classes.navItemName}>Map</span>
                        </NavLink>
                    </div>
                    <div className={classes.navItem}>
                        <NavLink className={classes.navLink} to='/craft'>
                            <Icon className={classes.iconBox}>
                                <CraftIcon width={20} height={20} />
                            </Icon>
                            <span className={classes.navItemName}>Craft</span>
                        </NavLink>
                    </div>
                    <div className={classes.navItem}>
                        <NavLink className={classNames(classes.navLink)} to='/explorer'>
                            <Icon className={classes.iconBox}>
                                <TravelExploreIcon width={20} height={20} />
                            </Icon>
                            <span className={classes.navItemName}>Aavegotchi explorer</span>
                        </NavLink>
                    </div>
                </nav>
            </div>
    );
}
