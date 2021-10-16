import React, {useEffect, useRef, useState} from 'react';
import { Box, Button, Link, Toolbar, Typography, IconButton } from '@mui/material';
import {NavLink, useLocation} from 'react-router-dom';
import classNames from 'classnames';
import {useStyles} from './styles';

import LoginButton from '../../components/Login/LoginButton';

import TwitterIcon from '@mui/icons-material/Twitter';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../assets/images/logo.png';
import discord from '../../assets/images/discord.svg';

export default function Header() {
    const classes = useStyles();
    const [navOpen, setNavOpen] = useState(false);
    const location = useLocation();
    const navRef = useRef(null);
    const hamburgerRef = useRef(null);


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
                        <img src={ discord } alt='' />
                        <Box component='span' className={classes.iconButtonText}>355</Box>
                    </Button>
                </Link>
                <Link href='https://twitter.com/orden_gg' className={classes.socialLink} target='_blank' underline='none'>
                    <Button className={classes.iconButton} aria-label='add an alarm'>
                        <TwitterIcon />
                        <Box component='span' className={classes.iconButtonText}>660</Box>
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
                <img className={classes.logo} src={logo} alt='logo' />
                <Typography className={classes.logoText}>
                    <Box component='span'>ghst</Box>
                    <Box component='span' className={classes.highlight}>_</Box>
                    <Box component='span'>gg</Box>
                </Typography>
            </NavLink>
            <Box className={classNames(classes.navWrapper, navOpen ? 'opened' : 'closed')} ref={navRef}>
                <nav className={classes.navigation}>
                    <NavLink className={classes.navLink} to='/market'>
                        <Box className={classes.navLinkBox}>
                            Market
                            <Typography variant={'caption'}>Filter</Typography>
                        </Box>
                    </NavLink>
                    <NavLink className={classes.navLink} to='/explorer'>
                        Explorer
                    </NavLink>
                    <NavLink className={classes.navLink} to='/client'>
                        <Box className={classes.navLinkBox}>
                            Client
                            <Typography variant={'caption'}>Beta</Typography>
                        </Box>
                    </NavLink>
                    <NavLink className={classes.navLink} to='/raffle-calculator'>
                        Raffle Calculator
                    </NavLink>
                </nav>
                {renderSocials('mobile')}
            </Box>
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
                {renderSocials('tablet')}
            </Box>
        </Toolbar>
    )
}