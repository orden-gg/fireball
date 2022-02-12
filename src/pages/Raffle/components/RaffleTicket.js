import React from 'react';
import { useTheme } from '@emotion/react';

import itemUtils from '../../../utils/itemUtils';
import commonUtils from '../../../utils/commonUtils';

import { ticketStyles } from '../styles';

export default function RaffleTicket({ticket}) {
    const classes = ticketStyles();
    const theme = useTheme();

    return (
        <div className={classes.ticket}>
            <img
                className={classes.ticketImg}
                src={itemUtils.getTicketImg(ticket.name)}
                alt={`${ticket.name} ticket`}
            />
            <p
                className={classes.ticketTitle}
                style={{ color: ticket.name === 'drop' ? '#c1ad87' : theme.palette.rarity[ticket.name] }}
            >
                {commonUtils.formatPrice(ticket.balance)}
            </p>
        </div>
    );
}