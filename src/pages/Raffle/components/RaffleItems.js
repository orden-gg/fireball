
import React from 'react';
import { Grid } from '@mui/material';

import Wearable from '../../../components/Items/Wearable/Wearable';

export default function RaffleItems({tickets}) {

    return (
        <Grid container spacing={2}>
            {
                tickets.slice(0).reverse().map((ticket) => {
                    if(ticket.prizes) return ticket.prizes.map((wearable, i) => {
                        // let raffleStats = {
                        //     amount: wearable.amount,
                        //     chance: wearable.chance
                        // }

                        return <Grid item xs={6} sm={4} md={2} key={i}>
                            <Wearable wearable={{id: wearable.id, balance: wearable.quantity}}></Wearable>
                        </Grid>
                    })
                    return null;
                })
            }
        </Grid>
    );
}