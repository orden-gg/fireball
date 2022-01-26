import React, {useContext, useEffect, useState} from 'react';
import { Box } from '@mui/material';
import { Route, Switch, Redirect, useRouteMatch, useHistory, useLocation } from 'react-router';
import {Helmet} from 'react-helmet';
import styles from './styles';

import queryString from 'query-string'
import { LoginContext } from '../../contexts/LoginContext';
import ProfilePane from '../../components/ProfilePane/ProfilePane';
import RaffleContextProvider from '../../contexts/RaffleContext';
import commonUtils from '../../utils/commonUtils';
import web3 from '../../api/web3';

// data
import raffles from './data/raffles.data';

// components
import RaffleNav from './components/RaffleNav';
import RaffleTickets from './components/RaffleTickets';

// routes
import RaffleContent from './routes/RaffleContent';

export default function Raffle() {
    const classes = styles();
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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [raffleActive]);

    return (
        <Box className={classes.container}>
            <Helmet>
                <title>
                    {
                        `raffle calculator || ${location.pathname.split('/')[2]} || ${raffleActive ? commonUtils.cutAddress(raffleActive, '...') : ''}`
                    }
                </title>
            </Helmet>

            {raffleActive !== 'null' && raffleActive?.length ? (
                <ProfilePane address={raffleActive} />
            ) : (
                null
            )}

            <RaffleNav address={raffleActive} />

            {web3.isAddressValid(raffleActive) ? (
                <RaffleTickets address={raffleActive} />
            ) : (
                null
            )}

            <RaffleContextProvider>
                <Switch>
                    <Route path={`${match.path}/:name`}>
                        <RaffleContent user={raffleActive} />
                    </Route>
                    <Redirect from={match.path} to={`${match.path}/${raffles.at(-1).name}`} />
                </Switch>
            </RaffleContextProvider>
        </Box>
    );
}