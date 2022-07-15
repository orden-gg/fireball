import { Avatar, Link } from '@mui/material';

import classNames from 'classnames';

import hopeUp from 'assets/images/gotchi-placeholder-up.svg';

import { teamStyles } from '../styles';

export function User() {
    const classes = teamStyles();

    return <Link
        href='https://discord.gg/orden'
        target='_blank'
        className={classNames(classes.teamUser, classes.gotchi)}
        underline='none'
    >
        <p className={classes.aavegotchiName}>You!</p>
        <Avatar className={classes.aavegotchiAvatar} variant='square' src={ hopeUp } />
    </Link>;
}
