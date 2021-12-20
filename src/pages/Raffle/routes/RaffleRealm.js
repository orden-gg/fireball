import React, { useContext, useEffect, useState } from 'react';

import { titleStyles } from '../styles';
import { DateTime } from 'luxon';
import { RaffleContext } from '../../../contexts/RaffleContext';

import RaffleTable from '../components/RaffleTable';
import RaffleCountdown from '../components/RaffleCountdown';

const startDate = DateTime.local(2021, 11, 5, 14, { zone: 'utc' });
const endDate = DateTime.local(2021, 11, 8, 14, { zone: 'utc' });

const raffle = { // Raffle config
    id: 6,
    tickets: [
        { id: 6, rarity: 'drop', value: '' }
    ]
};

export default function RaffleRealm({raffleActive}) {
    const classes = titleStyles();

    const [raffleEnded] = useState(endDate - DateTime.local() < 0 ? true : false);

    const { tickets, setTickets, getRaffleData, onAddressChange } = useContext(RaffleContext);

    useEffect(() => {
        setTickets(raffle.tickets);
        getRaffleData(raffle.id, raffle.tickets);
    }, []);

    useEffect(() => {
        onAddressChange(raffleActive, raffle.id);
    }, [raffleActive]);

    return (
        <div className={classes.inner}>
            <div className={classes.titleWrapper}>
                <h5 className={classes.title}>
                    Nov 5-8 [2021]
                </h5>
                <RaffleCountdown start={startDate} end={endDate} />
            </div>

            <RaffleTable
                raffleEnded={raffleEnded}
            />
        </div>
    );
}