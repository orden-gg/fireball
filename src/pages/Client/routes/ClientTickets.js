import React, { useContext } from 'react';
import { Box } from '@mui/material';
import { useStyles } from '../styles';
import { ClientContext } from '../../../contexts/ClientContext';

import Ticket from '../../../components/Items/Ticket/Ticket';
import GhostLoader from '../../../components/GhostLoader/GhostLoader';

export default function ClientTickets() {
    const classes = useStyles();
    const { tickets, loadingTickets } = useContext(ClientContext);

    if(loadingTickets || !tickets.length) {
        return <Box textAlign='center' paddingTop={'32px'}>
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