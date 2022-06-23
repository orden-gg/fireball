import { useContext } from 'react';
import { Icon } from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PersonIcon from '@mui/icons-material/Person';
import MapIcon from '@mui/icons-material/Map';
import { NavLink, useLocation } from 'react-router-dom';
import GavelIcon from '@mui/icons-material/Gavel';


import { GuildIcon, LendingIcon } from 'components/Icons/Icons';
import { LoginContext } from 'contexts/LoginContext';

import classNames from 'classnames';

import styles from './styles';

export default function NavPanel() {
    const classes = styles();
    const location = useLocation();

    const { activeAddress } = useContext(LoginContext);
    const clientLink = activeAddress ? `/client/${activeAddress}` : 'client';

    return (
            <div className={classes.container}>
                <nav className={classes.navigation}>
                    <div className={classes.navItem}>
                        <NavLink className={classNames(classes.navLink, location.href === clientLink)} to={clientLink}>
                            <Icon className={classes.iconBox}>
                                <PersonIcon width={20} height={20} />
                            </Icon>
                            <span className={classes.navItemName}>Client</span>
                        </NavLink>
                    </div>
                    <div className={classes.navItem}>
                        <NavLink className={classNames(classes.navLink, location.href === '/lend')} to='/lend'>
                            <Icon className={classes.iconBox}>
                                <LendingIcon width={20} height={20} />
                            </Icon>
                            <span className={classes.navItemName}>Lend</span>
                        </NavLink>
                    </div>
                    <div className={classes.navItem}>
                        <NavLink className={classNames(classes.navLink, location.href === '/market')} to='/market'>
                            <Icon className={classes.iconBox}>
                                <StoreIcon width={20} height={20} />
                            </Icon>
                            <span className={classes.navItemName}>Market</span>
                        </NavLink>
                    </div>
                    <div className={classes.navItem}>
                        <NavLink className={classNames(classes.navLink, location.href === '/autopet')} to='/autopet'>
                            <Icon className={classes.iconBox}>
                                <AutorenewIcon width={20} height={20} />
                            </Icon>
                            <span className={classes.navItemName}>Autopet</span>
                        </NavLink>
                    </div>
                    <div className={classes.navItem}>
                        <NavLink className={classNames(classes.navLink, location.href === '/guilds')} to='/guilds'>
                            <Icon className={classes.iconBox}>
                                <GuildIcon width={20} height={20} />
                            </Icon>
                            <span className={classes.navItemName}>Guilds</span>
                        </NavLink>
                    </div>
                    <div className={classes.navItem}>
                        <NavLink className={classNames(classes.navLink, location.href === '/raffles')} to='/raffles'>
                            <Icon className={classes.iconBox}>
                                <ConfirmationNumberIcon width={20} height={20} />
                            </Icon>
                            <span className={classes.navItemName}>Raffles</span>
                        </NavLink>
                    </div>
                    <div className={classes.navItem}>
                        <NavLink className={classNames(classes.navLink, location.href === '/map')} to='/map'>
                            <Icon className={classes.iconBox}>
                                <MapIcon width={20} height={20} />
                            </Icon>
                            <span className={classes.navItemName}>Map</span>
                        </NavLink>
                    </div>
                    <div className={classes.navItem}>
                        <NavLink className={classNames(classes.navLink, location.href === '/craft')} to='/craft'>
                            <Icon className={classes.iconBox}>
                                <GavelIcon width={20} height={20} />
                            </Icon>
                            <span className={classes.navItemName}>Map</span>
                        </NavLink>
                    </div>
                </nav>
            </div>
    );
}
