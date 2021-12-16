import React, { useContext, useEffect, useState } from 'react';

import { titleStyles } from '../styles';
import { DateTime } from 'luxon';
import { RaffleContext } from '../../../contexts/RaffleContext';

import RaffleTable from '../components/RaffleTable';
import RaffleCountdown from '../components/RaffleCountdown';

const startDate = DateTime.local(2021, 12, 15, 14, { zone: 'utc' });
const endDate = DateTime.local(2021, 12, 18, 14, { zone: 'utc' });

const raffle = { // Raffle config
    id: 7,
    tickets: [
        { id: 6, rarity: 'drop', value: '' }
    ]
};

export default function RaffleRealm2({raffleActive}) {
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
                    Dec 15-18 [2021]
                </h5>
                <RaffleCountdown start={startDate} end={endDate} />
            </div>

            <RaffleTable
                raffleEnded={raffleEnded}
            />
        </div>
    );
}