import React, { useContext } from 'react';
import { Box } from '@mui/material';

import Ticket from 'components/Items/Ticket/Ticket';
import GhostLoader from 'components/GhostLoader/GhostLoader';
import { ClientContext } from 'contexts/ClientContext';

import { routersStyles } from '../styles';

export default function ClientTickets() {
    const classes = routersStyles();
    const { tickets, loadingTickets } = useContext(ClientContext);

    if (loadingTickets || !tickets.length) {
        return <Box className={classes.loaderBox}>
            <GhostLoader
                animate={loadingTickets || !tickets.length}
                text={!loadingTickets && !tickets.length ? 'No ticket here :(' : null}
            />
        </Box>
    }

    return (
        <Box className={classes.list}>
            {
                tickets.map((ticket, i)=>{
                    return <div className={classes.listItem} key={i}>
                        <Ticket ticket={ticket} />
                    </div>
                })
            }
        </Box>
    );
}
