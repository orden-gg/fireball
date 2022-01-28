import React, { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';

import { titleStyles } from '../styles';
import { RaffleContext } from '../../../contexts/RaffleContext';

import RaffleTable from '../components/RaffleTable';
import RaffleItems from '../components/RaffleItems';
import raffles from '../data/raffles.data';

export default function RaffleContent({user}) {
    const classes = titleStyles();
    const history = useHistory();

    const { name } = useParams();

    const { raffle, setRaffle, tickets, setTickets, getRaffleData, getTicketsPreset, raffleSpinner, onAddressChange } = useContext(RaffleContext);

    useEffect(() => {
        const raffleName = raffles.some(item => item['name'] === name);

        if(!raffleName) { // redirect to last raffle if path do not exist
            setRaffle(raffles.at(-1));
            setTickets([]);

            history.push(`/raffle-calculator/${raffles.at(-1).name}`);
        } else { // set current raffle data
            const currentRaffle = raffles.find((item) => item.name === name);
            const ticketsPreset = getTicketsPreset(currentRaffle.tickets);

            setRaffle(currentRaffle);
            setTickets(ticketsPreset);

            getRaffleData(currentRaffle.id, ticketsPreset);
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
            <RaffleTable />

            <RaffleItems
                tickets={tickets}
                type={raffle.type}
            />
        </div>
    );
}