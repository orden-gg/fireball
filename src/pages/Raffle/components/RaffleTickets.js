import React, { useEffect, useState } from 'react';
import { CircularProgress, Grid, Typography } from '@mui/material';

import web3 from '../../../api/web3';
import RaffleTicket from './RaffleTicket';
import { tableStyles } from '../styles';

export default function RaffleTickets({address}) {
    const classes = tableStyles();

    const [tickets, setTickets] = useState([]);
    const [loadingTickets, setLoadingTickets] = useState(true);

    useEffect(() => {
        let controller = new AbortController();

        getTickets(controller);

        return () => controller?.abort(); // cleanup on destroy

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[address]);

    const getTickets = (controller) => {
        setLoadingTickets(true);

        web3.getTicketsByAddress(address).then((response) => {
            if(!controller.signal.aborted) {
                setTickets(response);
                setLoadingTickets(false);
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <Grid container spacing={2} className={classes.row}>
            <Grid item xs={12} md={3} style={{ position: 'relative' }}>
                <Typography variant='h6' className={classes.subtitle}>Your Tickets</Typography>
            </Grid>

            <Grid container item spacing={1} xs={12} md={8} lg={9}>

                {loadingTickets ? (
                    <Grid item sm={true} style={{ textAlign: 'center' }}>
                        <CircularProgress color='inherit' size={20} />
                    </Grid>
                ) : (
                    tickets.map((ticket, i)=>{
                        return <Grid item xs={4} sm={true} key={i} style={{ filter: `grayscale(${ticket.balance > 0 ? 0 : 1})` }}>
                            <RaffleTicket ticket={ticket} />
                        </Grid>
                    })
                )}
            </Grid>
        </Grid>
    );
}