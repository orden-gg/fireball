
import React from 'react';
import { Grid } from '@mui/material';

import Item from '../../../components/Item/Item';

export default function RaffleWearables({tickets}) {
    return (
        <Grid container spacing={2}>
            {
                tickets.slice(0).reverse().map((ticket) => {
                    if(ticket.chance !== 0) return ticket.wearables.map((wearable, i) => {
                        let raffleStats = {
                            amount: wearable.amount,
                            chance: wearable.chance
                        }

                        return <Grid item xs={6} sm={4} md={2} key={i}>
                            <Item item={wearable} raffleStats={raffleStats}></Item>
                        </Grid>
                    })
                    return null;
                })
            }
        </Grid>
    );
}