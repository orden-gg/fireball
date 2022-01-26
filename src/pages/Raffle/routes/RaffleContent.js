import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

import { titleStyles } from '../styles';
import { DateTime } from 'luxon';
import { RaffleContext } from '../../../contexts/RaffleContext';

import RaffleTable from '../components/RaffleTable';
import RaffleItems from '../components/RaffleItems';
import RaffleCountdown from '../components/RaffleCountdown';
import raffles from '../data/raffles.data';

// const startDate = DateTime.local(2021, 11, 5, 14, { zone: 'utc' });
// const endDate = DateTime.local(2021, 11, 8, 14, { zone: 'utc' });

export default function RaffleContent({user}) {
    const classes = titleStyles();
    const history = useHistory();

    const { name } = useParams();

    // const [raffleEnded] = useState(endDate - DateTime.local() < 0 ? true : false);

    const { raffle, setRaffle, tickets, setTickets, getRaffleData, raffleSpinner, onAddressChange } = useContext(RaffleContext);

    useEffect(() => {
        let raffleName = raffles.some(item => item['name'] === name );

        if(!raffleName) { // redirect to last raffle if path do not exist
            setRaffle(raffles.at(-1));
            setTickets([]);

            history.push(`/raffle-calculator/${raffles.at(-1).name}`);
        } else { // set current raffle data
            let currentRaffle = raffles.find((item) => item.name === name);

            setRaffle(currentRaffle);
            setTickets(currentRaffle.tickets);

            getRaffleData(currentRaffle.id, currentRaffle.tickets);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name]);

    useEffect(() => {
        if(!raffleSpinner) onAddressChange(user, raffle.id);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, raffleSpinner]);

    if(!raffle) return null;

    return (
        <div className={classes.inner}>
            {/* <div className={classes.titleWrapper}>
                <h5 className={classes.title}>
                    Nov 5-8 [2021]
                </h5>
                <RaffleCountdown start={startDate} end={endDate} />
            </div> */}

            <RaffleTable />

            {/* <div style={{ maxWidth: '195px', margin: 'auto' }}> */}
                <RaffleItems
                    tickets={tickets}
                    type={raffle.type}
                />
            {/* </div> */}
        </div>
    );
}