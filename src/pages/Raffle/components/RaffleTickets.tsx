import { useEffect, useState } from 'react';

import { CircularProgress, Grid, Typography } from '@mui/material';

import { TicketsApi } from 'api';

import { tableStyles } from '../styles';
import { RaffleTicket } from './RaffleTicket';

export function RaffleTickets({ address }: { address: string }) {
  const classes = tableStyles();

  const [tickets, setTickets] = useState<any[]>([]);
  const [loadingTickets, setLoadingTickets] = useState<boolean>(true);

  useEffect(() => {
    const controller = new AbortController();

    getTickets(controller);

    return () => controller?.abort(); // cleanup on destroy
  }, [address]);

  const getTickets = (controller: AbortController): void => {
    setLoadingTickets(true);

    TicketsApi.getTicketsByAddress(address)
      .then((response: any) => {
        if (!controller.signal.aborted) {
          setTickets(response);
          setLoadingTickets(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Grid container spacing={2} className={classes.row}>
      <Grid item xs={12} md={3} style={{ position: 'relative' }}>
        <Typography variant='h6' className={classes.subtitle}>
          Your Tickets
        </Typography>
      </Grid>

      <Grid container item spacing={1} xs={12} md={8} lg={9}>
        {loadingTickets ? (
          <Grid item sm={true} style={{ textAlign: 'center' }}>
            <CircularProgress color='inherit' size={20} />
          </Grid>
        ) : (
          tickets.map((ticket: any, i: number) => {
            return (
              <Grid item xs={4} sm={true} key={i} style={{ filter: `grayscale(${ticket.balance > 0 ? 0 : 1})` }}>
                <RaffleTicket ticket={ticket} />
              </Grid>
            );
          })
        )}
      </Grid>
    </Grid>
  );
}
