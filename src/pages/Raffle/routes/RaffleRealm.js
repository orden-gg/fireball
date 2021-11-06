import React, { useContext, useEffect, useState } from 'react';
import { useStyles } from '../styles';
import { raffleTicketPriceQuery } from '../data/queries';
import { DateTime } from 'luxon';

import web3 from '../../../api/web3';

import RaffleTable from '../components/RaffleTable';
import RaffleCountdown from '../components/RaffleCountdown';
import { RaffleContext } from '../../../contexts/RaffleContext';

const startDate = DateTime.local(2021, 11, 5, 14, { zone: 'utc' });
const endDate = DateTime.local(2021, 11, 8, 14, { zone: 'utc' });

export default function RaffleRealm({raffleActive}) {
    const classes = useStyles();

    const [raffleEnded] = useState(endDate - DateTime.local() < 0 ? true : false);

    const { tickets, setTickets, getRaffleData, getAddressEntered } = useContext(RaffleContext);

    useEffect(() => {
        setTickets([ // Raffle tickets config
            { id: 6, rarity: 'drop', value: '' }
        ]);

        getRaffleData(6, [raffleTicketPriceQuery(6)], `{
            total(id: 6) {
                totalDrop
            }
        }`);
    },[]);

    useEffect(() => {
        tickets.forEach((item, i) => tickets[i].value = '');

        if(web3.isAddressValid(raffleActive)) {
            getAddressEntered(raffleActive, 6);
        }
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