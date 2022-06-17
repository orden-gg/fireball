import { useContext, useEffect, useRef, useState } from 'react';
import { Box, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { LoginButton } from 'components/Login/LoginButton';
import { LogoIcon, MobileLogoIcon } from 'components/Icons/Icons';
import { LoginContext } from 'contexts/LoginContext';

import { Balances } from './components/Balances';
import { styles } from './styles';

export function Header() {
    const classes = styles();

    const [navOpen, setNavOpen] = useState<boolean>(false);
    const location = useLocation();
    const navRef = useRef<any>(null);
    const hamburgerRef = useRef<any>(null);

    const { activeAddress } = useContext<any>(LoginContext);
    const clientLink: string = activeAddress ? `/client/${activeAddress}` : 'client';

    // Close nav on route change
    useEffect(() => {
        setNavOpen(false);
    }, [location]);

    // Close nav on outside click
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutsideNav);

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideNav);
        };
    }, [navRef]);

    const handleClickOutsideNav = (event: MouseEvent): void => {
        if (navRef.current && !navRef.current.contains(event.target) && !hamburgerRef.current.contains(event.target)) {
            setNavOpen(false);
        }
    };

    return (
        <Toolbar className={classes.toolbar}>
            <NavLink className={classes.logoWrapper} to='/' >
                <LogoIcon className={classes.logoDesktop} width={80} height={34} />
                <MobileLogoIcon width={24} height={36} className={classes.logoMobile} />
            </NavLink>
            <Box className={classNames(classes.navWrapper, navOpen ? 'opened' : 'closed')} ref={navRef}>
                <nav className={classes.navigation}>
                    <NavLink className={classes.navLink} to={clientLink}>
                        <Box className={classes.navLinkBox}>
                            Client
                        </Box>
                    </NavLink>
                    <NavLink className={classes.navLink} to='/lend'>
                        Lend
                    </NavLink>
                    <NavLink className={classes.navLink} to='/market'>
                        <Box className={classes.navLinkBox}>
                            Market
                            <Typography variant={'caption'}>Filter</Typography>
                        </Box>
                    </NavLink>
                    <NavLink className={classes.navLink} to='/autopet'>
                        Autopet
                    </NavLink>
                    <NavLink className={classes.navLink} to='/guilds'>
                        Guilds
                    </NavLink>
                    <NavLink className={classes.navLink} to='/raffles'>
                        Raffles
                    </NavLink>
                    <NavLink className={classes.navLink} to='/map'>
                        map
                    </NavLink>
                </nav>
            </Box>

            { activeAddress && <Balances /> }

            <Box className={classes.group}>
                <LoginButton />
                <IconButton
                    color='primary'
                    aria-label='menu'
                    className={classes.navHamburger}
                    onClick={() => setNavOpen(!navOpen)}
                    ref={hamburgerRef}
                >
                    <MenuIcon />
                </IconButton>
            </Box>
        </Toolbar>
    );
}