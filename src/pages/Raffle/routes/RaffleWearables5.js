import React, { useContext, useEffect, useState } from 'react';
import { useStyles } from '../styles';
import { raffleTicketPriceQuery } from '../data/queries';
import { DateTime } from 'luxon';
import { RaffleContext } from '../../../contexts/RaffleContext';

import web3 from '../../../api/web3';

import RaffleTable from '../components/RaffleTable';
import RaffleCountdown from '../components/RaffleCountdown';

const startDate = DateTime.local(2021, 9, 24, 14, { zone: 'utc' });
const endDate = DateTime.local(2021, 9, 27, 14, { zone: 'utc' });

export default function RaffleWearables5({raffleActive}) {
    const classes = useStyles();

    const [raffleEnded] = useState(endDate - DateTime.local() < 0 ? true : false);

    const { tickets, setTickets, getRaffleData, getAddressEntered } = useContext(RaffleContext);

    useEffect(() => {
        setTickets([ // Raffle tickets config
            { id: 0, rarity: 'common', value: '' },
            { id: 1, rarity: 'uncommon', value: '' },
            { id: 2, rarity: 'rare', value: '' },
            { id: 3, rarity: 'legendary', value: '' },
            { id: 4, rarity: 'mythical', value: '' },
            { id: 5, rarity: 'godlike', value: '' }
        ]);

        getRaffleData(5, [
            raffleTicketPriceQuery(0),
            raffleTicketPriceQuery(1),
            raffleTicketPriceQuery(2),
            raffleTicketPriceQuery(3),
            raffleTicketPriceQuery(4),
            raffleTicketPriceQuery(5)
        ], `{
            total(id: 5) {
                totalCommon
                totalUncommon
                totalRare
                totalLegendary
                totalMythical
                totalLegendary
                totalGodLike
            }
        }`);
    }, []);

    useEffect(() => {
        tickets.forEach((item, i) => tickets[i].value = '');

        if(web3.isAddressValid(raffleActive)) {
            getAddressEntered(raffleActive, 5);
        };
    }, [raffleActive]);

    return (
        <div className={classes.inner}>
            <div className={classes.titleWrapper}>
                <h5 className={classes.title}>
                    Sep 24-27 [2021]
                </h5>
                <RaffleCountdown start={startDate} end={endDate} />
            </div>

            <RaffleTable
                raffleEnded={raffleEnded}
            />
        </div>
    );
}