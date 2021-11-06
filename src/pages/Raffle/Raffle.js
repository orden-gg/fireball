import React, {useContext, useEffect, useState} from 'react';
import { Box } from '@mui/material';
import { Route, Switch, Redirect, useRouteMatch, useHistory, useLocation } from 'react-router';
import {Helmet} from 'react-helmet';
import {useStyles} from './styles';
import queryString from 'query-string'

import RaffleNav from './components/RaffleNav';
import RaffleRealm from './routes/RaffleRealm';
import RaffleWearables5 from './routes/RaffleWearables5';
import { LoginContext } from '../../contexts/LoginContext';
import ProfilePane from '../../components/ProfilePane/ProfilePane';
import RaffleContextProvider from '../../contexts/RaffleContext';

export default function Raffle() {
    const classes = useStyles();
    const match = useRouteMatch();
    const location = useLocation();
    const history = useHistory();
    const params = queryString.parse(location.search)

    const [raffleActive, setRaffleActive] = useState(null);

    const { activeAddress } = useContext(LoginContext);

    useEffect(() => {
        if(activeAddress) {
            setRaffleActive(activeAddress);
        }
    }, [activeAddress]);

    useEffect(() => {
        if(params.address) {
            setRaffleActive(params.address);
        }
    }, [params.address]);

    useEffect(() => {
        if(raffleActive) {
            history.push({ path: location.pathname, search: `?address=${raffleActive}` });
        } else {
            history.push({ path: location.pathname });
        }
    }, [raffleActive]);

    // const countTicketsChance = () => {
    //     let ticketsLocalRef = [...tickets];

    //     ticketsLocalRef.forEach((ticket, i) => {
    //         let combinedSupply = enteredCombined ? +ticket.supply + +getTicketQuantity(ticket.type) : ticket.supply;
    //         let chance = getTicketQuantity(ticket.type) / combinedSupply * ticket.items;
    //         // let chance = combinedSupply * 100 / getTicketQuantity(ticket.type);
    //         let percentage = (chance * 100).toFixed(1);
    //         let price = ticket.price;
    //         let cost = (getTicketQuantity(ticket.type) * price).toFixed(2);

    //         let wearables = countWearablesChance(ticket.wearables, ticket.items, chance.toFixed(2), combinedSupply);

    //         ticketsLocalRef[i] = {
    //             ...ticket,
    //             chance: chance > ticket.items ? `x${ticket.items.toFixed(2)}` :
    //                     chance > combinedSupply ? `x${combinedSupply.toFixed(2)}` :
    //                     chance > 1 ? `x${chance.toFixed(2)}` :
    //                     chance > 0 ? `${percentage}% for 1` : 0,
    //             cost: Math.round(cost) > Math.round(price) ? cost : price,
    //             entered: combinedSupply,
    //             wearables: wearables
    //         };
    //     });

    //     setTickets(ticketsLocalRef);
    // }

    // const countWearablesChance = (wearables, itemsAmount, chance, combinedSupply) => {
    //     wearables.forEach((wearable) => {
    //         let percentage = (wearable.amount * 100 / itemsAmount).toFixed(5);
    //         let wearableChance = percentage * chance / 100;
    //         let singleSupply = combinedSupply / 3;

    //         if(wearableChance > wearable.amount) {
    //             wearable.chance = `x${wearable.amount.toFixed(2)}`;
    //         } else if(wearableChance > singleSupply) {
    //             wearable.chance = singleSupply > 1 ? `x${singleSupply.toFixed(2)}` : `${(singleSupply * 100).toFixed(1)}% for 1`;;
    //         } else {
    //             wearable.chance = wearableChance > 1 ? `x${wearableChance.toFixed(2)}` : `${(wearableChance * 100).toFixed(1)}% for 1`;
    //         }
    //     });
    //     return wearables;
    // };

    return (
        <Box className={classes.container}>
            <Helmet>
                <title>Raffle Calculator</title>
            </Helmet>

            {raffleActive !== 'null' && raffleActive?.length ? (
                <ProfilePane address={raffleActive} />
            ) : (
                null
            )}

            {/* {web3.isAddressValid(raffleActive) ? (
                <RaffleTickets address={raffleActive} />
            ) : (
                null
            )} */}

            <RaffleNav address={raffleActive} />

            <RaffleContextProvider>
                <Switch>
                    <Route path={`${match.path}/wearables-5`}>
                        <RaffleWearables5 raffleActive={raffleActive} />
                    </Route>
                    <Route path={`${match.path}/realm`}>
                        <RaffleRealm raffleActive={raffleActive} />
                    </Route>
                    <Redirect from={match.path} to={`${match.path}/realm`} />
                </Switch>
            </RaffleContextProvider>

            {/* <RaffleWearables tickets={tickets} /> */}
        </Box>
    );
}