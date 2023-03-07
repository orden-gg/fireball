import { NavLink, useLocation } from 'react-router-dom';

import { Button } from '@mui/material';

import { raffles } from '../data/raffles.data';
import { RafflesData } from '../models/raffles-data.model';
import { raffleNavStyles } from '../styles';
import { RaffleDate } from './RaffleDate';

export function RaffleNav({ user }: { user: any }) {
  const classes = raffleNavStyles();

  const location = useLocation();

  return (
    <div className={classes.container}>
      {raffles.map((raffle: RafflesData, index: number) => {
        return (
          <div key={index} className={classes.buttonContainer}>
            <Button
              startIcon={<img src={raffle.icon} alt={raffle.name} width={20} height={20} />}
              component={NavLink}
              className={classes.button}
              to={{ pathname: raffle.name, search: `?address=${user}` }}
            >
              {raffle.name.replace(/-/g, ' ')}
            </Button>

            {location.pathname.split('/')[2] === raffle.name && (
              <RaffleDate start={raffle.startDate} end={raffle.endDate} />
            )}
          </div>
        );
      })}
    </div>
  );
}
