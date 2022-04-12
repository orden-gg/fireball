import React, {useContext, useEffect, useRef, useState} from 'react';
import { Box, Button, Link, Toolbar, Typography, IconButton } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { DiscordIcon, LogoIcon } from 'components/Icons/Icons';
import LoginButton from 'components/Login/LoginButton';
import { LoginContext } from 'contexts/LoginContext';

import Balances from './components/Balances';
import styles from './styles';

export default function Header() {
    const classes = styles();
    const [navOpen, setNavOpen] = useState(false);
    const location = useLocation();
    const navRef = useRef(null);
    const hamburgerRef = useRef(null);

    const { activeAddress } = useContext(LoginContext);

    // Close nav on route change
    useEffect(() => {
        setNavOpen(false);
    }, [location]);

    // Close nav on outside click
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutsideNav);
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideNav);
        };
    }, [navRef]);

    const handleClickOutsideNav = (event) => {
        if (navRef.current && !navRef.current.contains(event.target) && !hamburgerRef.current.contains(event.target)) {
            setNavOpen(false);
        }
    };

    const renderSocials = (view) => {
        return (
            <Box className={classNames(classes.socialLinkList, view)} >
                <Link href='https://discord.gg/NXEEETxSkC' className={classes.socialLink} target='_blank' underline='none'>
                    <Button className={classes.iconButton} aria-label='add an alarm'>
                        <DiscordIcon width={24} height={24} />
                        <Box component='span' className={classes.iconButtonText}>500</Box>
                    </Button>
                </Link>
                <Link href='https://twitter.com/orden_gg' className={classes.socialLink} target='_blank' underline='none'>
                    <Button className={classes.iconButton} aria-label='add an alarm'>
                        <TwitterIcon />
                        <Box component='span' className={classes.iconButtonText}>1200</Box>
                    </Button>
                </Link>
                <Link href='https://github.com/orden-gg/fireball' className={classes.socialLink} target='_blank' underline='none'>
                    <Button className={classes.iconButton} aria-label='add an alarm'>
                        <GitHubIcon />
                        <Box component='span' className={classes.iconButtonText}>16</Box>
                    </Button>
                </Link>
                <Box className={classes.socialLinkJoin}>
                    <Typography variant={'caption'}>Join our community!</Typography>
                </Box>
            </Box>
        )
    };

    return (
        <Toolbar className={classes.toolbar}>
            <NavLink className={classes.logoWrapper} to='/'>
                <LogoIcon width={80} height={34} />
            </NavLink>
            <Box className={classNames(classes.navWrapper, navOpen ? 'opened' : 'closed')} ref={navRef}>
                <nav className={classes.navigation}>
                    <NavLink className={classes.navLink} to='/client'>
                        <Box className={classes.navLinkBox}>
                            Client
                            <Typography variant={'caption'}>Beta</Typography>
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
                    <NavLink className={classes.navLink} to='/raffle-calculator'>
                        Raffle Calculator
                    </NavLink>
                </nav>
                {renderSocials('mobile')}
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
                {/* !TODO: Temporary solution for header responsiveness */}
                {/* {renderSocials('tablet')} */}
            </Box>
        </Toolbar>
    )
}
