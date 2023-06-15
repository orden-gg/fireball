import { useTheme } from '@mui/material';

import { CommonUtils, ItemUtils } from 'utils';

import { ticketStyles } from '../styles';

export function RaffleTicket({ ticket }: { ticket: CustomAny }) {
  const classes = ticketStyles();

  const theme = useTheme();

  return (
    <div className={classes.ticket}>
      <img className={classes.ticketImg} src={ItemUtils.getTicketImg(ticket.name)} alt={`${ticket.name} ticket`} />
      <p
        className={classes.ticketTitle}
        // TODO check is ticket.name === 'drop' really needed as we have drop in palette
        style={{ color: ticket.name === 'drop' ? '#c1ad87' : theme.palette.rarity[ticket.name] }}
      >
        {CommonUtils.formatPrice(ticket.balance)}
      </p>
    </div>
  );
}
