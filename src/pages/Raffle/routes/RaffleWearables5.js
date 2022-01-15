import React, { useContext, useEffect, useState } from 'react';

import { titleStyles } from '../styles';
import { DateTime } from 'luxon';
import { RaffleContext } from '../../../contexts/RaffleContext';

import RaffleTable from '../components/RaffleTable';
// import RaffleItems from '../components/RaffleItems';
import RaffleCountdown from '../components/RaffleCountdown';

const startDate = DateTime.local(2021, 9, 24, 14, { zone: 'utc' });
const endDate = DateTime.local(2021, 9, 27, 14, { zone: 'utc' });

const raffle = { // Raffle config
    id: 5,
    tickets: [
        { id: 0, rarity: 'common', value: '' },
        { id: 1, rarity: 'uncommon', value: '' },
        { id: 2, rarity: 'rare', value: '' },
        { id: 3, rarity: 'legendary', value: '' },
        { id: 4, rarity: 'mythical', value: '' },
        { id: 5, rarity: 'godlike', value: '' }
    ]
};

export default function RaffleWearables5({raffleActive}) {
    const classes = titleStyles();

    const [raffleEnded] = useState(endDate - DateTime.local() < 0 ? true : false);

    const { tickets, setTickets, getRaffleData, onAddressChange } = useContext(RaffleContext);

    useEffect(() => {
        setTickets(raffle.tickets);
        getRaffleData(raffle.id, raffle.tickets);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        onAddressChange(raffleActive, raffle.id);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [raffleActive]);

    return (
        <div className={classes.inner}>
            {/* <div className={classes.titleWrapper}>
                <h5 className={classes.title}>
                    Sep 24-27 [2021]
                </h5>
                <RaffleCountdown start={startDate} end={endDate} />
            </div> */}

            <RaffleTable
                raffleEnded={raffleEnded}
            />

            {/* {tickets.length === 6 ? ( // TODO: wtf is this? - temporary solution for route switch data rendering
                <RaffleItems tickets={tickets} /> 
            ) : (
                null
            )} */}
            
        </div>
    );
}