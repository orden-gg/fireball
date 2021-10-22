import React from 'react';
import { Box, Typography } from '@mui/material';
import classNames from 'classnames';
import useStyles from '../styles';

import itemUtils from '../../../utils/itemUtils';

export default function Ticket({ticket}) {
    const classes = useStyles();

    console.log(ticket);

    return (
        <Box className={classNames(classes.item, ticket.name)}>
            <Typography align='right' variant='subtitle2'>
                {ticket.balance}
            </Typography>

            <img
                src={itemUtils.getTicketImg(ticket.name)}
                alt={ticket.name}
                height={75}
                width={75}
            />

            <Typography className={classNames(classes.textHighlight, ticket.name)}>
                {ticket.name}
            </Typography>
        </Box>
    )
}