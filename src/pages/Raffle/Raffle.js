import { useContext, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Route, Switch, Redirect, useRouteMatch, useHistory, useLocation } from 'react-router';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';

import ProfilePane from 'components/ProfilePane/ProfilePane';
import ethersApi from 'api/ethers.api';
import { LoginContext } from 'contexts/LoginContext';
import RaffleContextProvider from 'contexts/RaffleContext';
import commonUtils from 'utils/commonUtils';

import RaffleContent from './routes/RaffleContent';
import RaffleNav from './components/RaffleNav';
import RaffleTickets from './components/RaffleTickets';
import raffles from './data/raffles.data';
import styles from './styles';

export default function Raffle() {
    const classes = styles();
    const match = useRouteMatch();
    const location = useLocation();
    const history = useHistory();
    const params = queryString.parse(location.search);
    const lastRaffle = raffles[raffles.length - 1];

    const [raffleActive, setRaffleActive] = useState(null);

    const { activeAddress } = useContext(LoginContext);

    useEffect(() => {
        if (activeAddress) {
            setRaffleActive(activeAddress);
        }
    }, [activeAddress]);

    useEffect(() => {
        if (params.address) {
            setRaffleActive(params.address);
        }
    }, [params.address]);

    useEffect(() => {
        if (raffleActive) {
            history.push({ path: location.pathname, search: `?address=${raffleActive}` });
        } else {
            history.push({ path: location.pathname });
        }
    }, [raffleActive]);

    return (
        <Box className={classes.container}>
            <Helmet>
                <title>
                    {
                        `raffles || ${location.pathname.split('/')[2]} || ${raffleActive ? commonUtils.cutAddress(raffleActive, '...') : ''}`
                    }
                </title>
            </Helmet>

            {raffleActive !== 'null' && raffleActive?.length ? (
                <ProfilePane address={raffleActive} />
            ) : (
                null
            )}

            <RaffleNav user={raffleActive} />

            {ethersApi.isEthAddress(raffleActive) ? (
                <RaffleTickets address={raffleActive} />
            ) : (
                null
            )}

            <RaffleContextProvider>
                <Switch>
                    <Route path={`${match.path}/:name`}>
                        <RaffleContent user={raffleActive} />
                    </Route>
                    <Redirect from={match.path} to={`${match.path}/${lastRaffle.name}`} />
                </Switch>
            </RaffleContextProvider>
        </Box>
    );
}
