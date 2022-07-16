import { Avatar, Link } from '@mui/material';

import classNames from 'classnames';

import hopeUp from 'assets/images/gotchi-placeholder-up.svg';

import { teamStyles } from '../styles';

export function User() {
    const classes = teamStyles();

    return <Link
        href='https://discord.gg/orden'
        target='_blank'
        className={classNames(classes.homeGotchi)}
        underline='none'
    >
        <p className={classes.gotchiName}><span>You!</span></p>
        <Avatar className={classes.gotchiAvatar} variant='square' src={hopeUp} />
    </Link>;
}
