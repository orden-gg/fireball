import React from 'react';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/system';
import classNames from 'classnames';

import itemUtils from '../../../utils/itemUtils';

const useStyles = makeStyles((theme) => ({
    ticket: {
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.secondary.dark,
        padding: '16px 12px',
        textAlign: 'center',
        height: '100%',
        position: 'relative',
        '&.common': {
            backgroundColor: alpha(theme.palette.rarity.common, .1)
        },
        '&.uncommon': {
            backgroundColor: alpha(theme.palette.rarity.uncommon, .1)
        },
        '&.rare': {
            backgroundColor: alpha(theme.palette.rarity.rare, .1)
        },
        '&.legendary': {
            backgroundColor: alpha(theme.palette.rarity.legendary, .1)
        },
        '&.mythical': {
            backgroundColor: alpha(theme.palette.rarity.mythical, .1)
        },
        '&.godlike': {
            backgroundColor: alpha(theme.palette.rarity.godlike, .1)
        },
    },
    textHighlight: {
        '&.common': {
            color: theme.palette.rarity.common
        },
        '&.uncommon': {
            color: theme.palette.rarity.uncommon
        },
        '&.rare': {
            color: theme.palette.rarity.rare
        },
        '&.legendary': {
            color: theme.palette.rarity.legendary
        },
        '&.mythical': {
            color: theme.palette.rarity.mythical
        },
        '&.godlike': {
            color: theme.palette.rarity.godlike
        },
    },
    owner: {
        borderRadius: theme.shape.borderRadius,
        fontSize: 12,
        padding: '2px 4px',
    },
}));

export default function Ticket({ticket}) {
    const classes = useStyles();

    return (
        <Box className={classNames(classes.ticket, ticket.rarity)}>
            <img
                src={itemUtils.getTicketImg(ticket.name)}
                alt={ticket.name}
                height={75}
                width={75}
            />
            <Typography className={classNames(classes.textHighlight, ticket.rarity)}>
                {ticket.name}
            </Typography>
            <Typography variant='subtitle2'>
                {ticket.balance}
            </Typography>
        </Box>
    )
}