import React from 'react';
import { Box, Alert } from '@mui/material';
import { useStyles } from '../styles';

import Ticket from '../../../components/Items/Ticket/Ticket';

export default function ClientTickets({tickets}) {
    const classes = useStyles();

    if(!tickets.length) {
        return <Alert severity='info' sx={{ display: 'inline-flex' }}>
            No ticket here...
        </Alert>
    }

    return (
        <Box className={classes.list}>
            {
                tickets.map((ticket, i)=>{
                    return <div className={classes.listItem}  key={i}>
                        <Ticket ticket={ticket} />
                    </div>
                })
            }
        </Box>
    );
}