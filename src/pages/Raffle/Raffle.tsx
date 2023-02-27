import { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Box } from '@mui/material';

import queryString from 'query-string';

import { useAppSelector } from 'core/store/hooks';
import { getActiveAddress } from 'core/store/login';
import { CustomParsedQuery } from 'shared/models';
import { ProfilePane } from 'components/ProfilePane/ProfilePane';
import { EthersApi } from 'api';
import { RaffleContextProvider } from 'contexts/RaffleContext';
import { CommonUtils } from 'utils';

import { RaffleContent } from './routes/RaffleContent';
import { RaffleNav } from './components/RaffleNav';
import { RaffleTickets } from './components/RaffleTickets';
import { raffles } from './data/raffles.data';
import { styles } from './styles';

export function Raffle() {
  const classes = styles();

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = queryString.parse(location.search) as CustomParsedQuery;
  const lastRaffle = raffles[raffles.length - 1];

  const activeAddress = useAppSelector(getActiveAddress);

  const [raffleActive, setRaffleActive] = useState<string>('');

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
    const currentRaffle = raffles.find((raffle) => raffle.name === currentSubroute);

    if (raffleActive && currentRaffle) {
      queryParams.address = raffleActive;

      navigate({
        pathname: currentRaffle.name,
        search: queryString.stringify(queryParams, { arrayFormat: 'comma', encode: false })
      });
    }
  }, [raffleActive]);

  return (
    <Box className={classes.container}>
      <Helmet>
        <title>
          {`raffles || ${location.pathname.split('/')[2]} || ${
            raffleActive ? CommonUtils.cutAddress(raffleActive, '...') : ''
          }`}
        </title>
      </Helmet>

      {raffleActive !== 'null' && raffleActive?.length ? <ProfilePane address={raffleActive} /> : null}

      <RaffleNav user={raffleActive} />

      {EthersApi.isEthAddress(raffleActive) ? <RaffleTickets address={raffleActive} /> : null}

      <RaffleContextProvider>
        <Routes>
          <Route path=':name' element={<RaffleContent user={raffleActive} />} />
          <Route path='*' element={<Navigate to={lastRaffle.name} replace />} />
        </Routes>
      </RaffleContextProvider>
    </Box>
  );
}
