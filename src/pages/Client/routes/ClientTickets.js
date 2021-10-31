import React from 'react';
import { Box, Alert, Link } from '@mui/material';
import { useStyles } from '../styles';

import Ticket from '../../../components/Items/Ticket/Ticket';

export default function ClientTickets({tickets}) {
    const classes = useStyles();

    if(!tickets.length) {
        return <Alert severity='info' sx={{ display: 'inline-flex' }}>
            No ticket here... <Link
                href='https://www.aavegotchi.com/baazaar/tickets?sort=latest'
                target='_blank'
                underline='hover'
                style={{ color: 'red' }}
            >
                [Baazaar listings]
            </Link>
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