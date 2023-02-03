import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { RaffleContext } from 'contexts/RaffleContext';

import { RaffleTable } from '../components/RaffleTable';
import { RaffleItems } from '../components/RaffleItems';
import { RafflesData } from '../models/raffles-data.model';
import { raffles } from '../data/raffles.data';

export function RaffleContent({ user }) {
  const navigate = useNavigate();
  const { name } = useParams<{ name: string }>();

  const {
    raffle,
    setRaffle,
    tickets,
    setTickets,
    getRaffleData,
    getTicketsPreset,
    raffleSpinner,
    onAddressChange
  } = useContext<any>(RaffleContext);

  useEffect(() => {
    const raffleName: boolean = raffles.some(item => item['name'] === name);
    const lastRaffle: RafflesData = raffles[raffles.length - 1];

    if (!raffleName) {
      // redirect to last raffle if path do not exist
      setRaffle(lastRaffle);
      setTickets([]);

      navigate(`/raffles/${lastRaffle.name}`);
    } else {
      // set current raffle data
      const currentRaffle = raffles.find(item => item.name === name);
      const ticketsPreset = getTicketsPreset(currentRaffle?.tickets);

      setRaffle(currentRaffle);
      setTickets(ticketsPreset);

      getRaffleData(currentRaffle?.id, ticketsPreset);
    }
  }, [name]);

  useEffect(() => {
    if (!raffleSpinner) {
      onAddressChange(user, raffle.id);
    }
  }, [user, raffleSpinner]);

  if (!raffle) {
    return <></>;
  }

  return (
    <div>
      <RaffleTable />

      <RaffleItems tickets={tickets} type={raffle.type} />
    </div>
  );
}
