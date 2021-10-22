import React from 'react';
import { Box } from '@mui/material';
import { useStyles } from '../styles';

import Ticket from '../../../components/Warehouse/Ticket/Ticket';

export default function ClientTickets({tickets}) {
    const classes = useStyles();

    return (
        <>
            <Box className={classes.list}>
                {
                    tickets.map((ticket, i)=>{
                        return <div className={classes.listItem}  key={i}>
                            <Ticket ticket={ticket} />
                        </div>
                    })
                }
            </Box>
        </>
    );
}