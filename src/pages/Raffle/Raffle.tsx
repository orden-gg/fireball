import { useContext, useEffect, useState } from 'react';
import { Route, Switch, Redirect, useRouteMatch, useHistory, useLocation } from 'react-router';
import { Helmet } from 'react-helmet';
import { Box } from '@mui/material';

import queryString from 'query-string';

import { CustomParsedQuery } from 'shared/models';
import { ProfilePane } from 'components/ProfilePane/ProfilePane';
import { EthersApi } from 'api';
import { LoginContext } from 'contexts/LoginContext';
import { RaffleContextProvider } from 'contexts/RaffleContext';
import { CommonUtils } from 'utils';

import { RaffleContent } from './routes/RaffleContent';
import { RaffleNav } from './components/RaffleNav';
import { RaffleTickets } from './components/RaffleTickets';
import { raffles } from './data/raffles.data';
import { styles } from './styles';

export function Raffle() {
    const classes = styles();

    const match = useRouteMatch();
    const location = useLocation();
    const history = useHistory();
    const queryParams = queryString.parse(location.search) as CustomParsedQuery;
    const lastRaffle = raffles[raffles.length - 1];

    const [raffleActive, setRaffleActive] = useState<string>('');

    const { activeAddress } = useContext<any>(LoginContext);

    useEffect(() => {
        if (activeAddress) {
            setRaffleActive(activeAddress);
        }
    }, [activeAddress]);

    useEffect(() => {
        if (queryParams.address) {
            setRaffleActive(queryParams.address);
        }
    }, [queryParams.address]);

    useEffect(() => {
        const currentSubroute = location.pathname.split('/')[2];
        const currentRaffle = raffles.find(raffle => raffle.name === currentSubroute);

        if (raffleActive && currentRaffle) {
            queryParams.address = raffleActive;

            history.push({
                pathname: `${match.path}/${currentRaffle.name}`,
                search: queryString.stringify(queryParams, { arrayFormat: 'comma', encode: false })
            });
        }
    }, [raffleActive]);

    return (
        <Box className={classes.container}>
            <Helmet>
                <title>
                    {
                        `raffles || ${location.pathname.split('/')[2]} || ${raffleActive ? CommonUtils.cutAddress(raffleActive, '...') : ''}`
                    }
                </title>
            </Helmet>

            {raffleActive !== 'null' && raffleActive?.length ? (
                <ProfilePane address={raffleActive} />
            ) : (
                null
            )}

            <RaffleNav user={raffleActive} />

            {EthersApi.isEthAddress(raffleActive) ? (
                <RaffleTickets address={raffleActive} />
            ) : (
                null
            )}

            <RaffleContextProvider>
                <Switch>
                    <Route path={`${match.path}/:name`}>
                        <RaffleContent user={raffleActive} />
                    </Route>
                    <Redirect from='*' to={`${match.path}/${lastRaffle.name}`} />
                </Switch>
            </RaffleContextProvider>
        </Box>
    );
}
