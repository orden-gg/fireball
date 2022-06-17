import { useTheme } from '@mui/material';

import commonUtils from 'utils/commonUtils';
import itemUtils from 'utils/itemUtils';

import { ticketStyles } from '../styles';

export function RaffleTicket({ ticket }: { ticket: any }) {
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
                // TODO check is ticket.name === 'drop' really needed as we have drop in palette
                style={{ color: ticket.name === 'drop' ? '#c1ad87' : theme.palette.rarity[ticket.name] }}
            >
                {commonUtils.formatPrice(ticket.balance)}
            </p>
        </div>
    );
}
