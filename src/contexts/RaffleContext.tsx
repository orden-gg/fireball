import { createContext, useEffect, useState } from 'react';
import { DateTime } from 'luxon';

import { raffleTicketPriceQuery } from 'pages/Raffle/data/queries.data';
import { EthersApi, TheGraphApi } from 'api';
import { CommonUtils, ItemUtils } from 'utils';

export const RaffleContext = createContext({});

export const RaffleContextProvider = (props: any) => {
  const [raffle, setRaffle] = useState<any>(null);
  const [tickets, setTickets] = useState<any[]>([]);

  const [loadingEntered, setLoadingEntered] = useState<boolean>(true);

  const [raffleSpinner, setRaffleSpinner] = useState<boolean>(true);
  const [pricesSpinner, setPricesSpinner] = useState<boolean>(true);

  useEffect(() => {
    if (!raffleSpinner && !loadingEntered) {
      setTickets((ticketsCache: any[]) => {
        return ticketsCache.map((ticket: any) => {
          ticket.chance = countChances(ticket.value, ticket.entered, ticket.items); // TODO: check how this 2 count chances works at the same time
          ticket.prizes = countWearablesChances(ticket);

          return ticket;
        });
      });
    }
  }, [raffleSpinner, loadingEntered]);

  const getRaffleData = (raffle: any, raffleTickets: any[]): void => {
    getRaffle(raffle);
    getPrices(raffleTickets);
  };

  const getRaffle = (raffle: any): void => {
    setRaffleSpinner(true);

    TheGraphApi.getRaffle(raffle)
      .then((response) => {
        const [prizes, total] = response;

        setTickets((ticketsCache: any[]) => {
          return ticketsCache.map((ticket: any, i: number) => {
            ticket.items = prizes[i].items;
            ticket.prizes = prizes[i].prizes;
            ticket.entered =
              total[ticket.rarity === 'godlike' ? 'totalGodLike' : `total${CommonUtils.capitalize(ticket.rarity)}`];

            return ticket;
          });
        });
        setRaffleSpinner(false);
      })
      .catch((error) => console.log(error));
  };

  const getPrices = (raffleTickets: any[]): void => {
    const queries: string[] = raffleTickets.map((ticket: any) => raffleTicketPriceQuery(ticket.id));

    setPricesSpinner(true);

    TheGraphApi.getJoinedData(queries).then((response: any) => {
      const averagePrices: any[] = response.map((item: any) => {
        const prices: any = item.data.erc1155Listings.map((wei) => parseInt(wei.priceInWei));
        const average: any = prices.reduce((a: any, b: any) => a + b, 0) / prices.length;
        const price: number = average / 10 ** 18;

        return price.toFixed(2);
      });

      setTickets((ticketsCache: any[]) => {
        return ticketsCache.map((ticket: any, i: number) => {
          ticket.price = averagePrices[i];

          return ticket;
        });
      });
      setPricesSpinner(false);
    });
  };

  const getAddressData = (address: string, raffle: any): void => {
    setLoadingEntered(true);

    Promise.all([TheGraphApi.getRaffleEntered(address, raffle), TheGraphApi.getRaffleWins(address, raffle)])
      .then(([entered, won]: [any, any]) => {
        setTickets((ticketsCache: any[]) => {
          const modified: any[] = [...ticketsCache];

          entered.forEach((item: any) => {
            const elem: any = modified.length > 1 ? item.ticketId : 0;

            modified[elem].value = item.quantity;
            modified[elem].prizes = modified[elem].prizes.map((item) => {
              const index: number = won.findIndex((prize: any) => prize.itemId === item.id);

              return {
                ...item,
                won: index !== -1 ? won[index].quantity : 0
              };
            });
          });

          return modified;
        });
        setLoadingEntered(false);
      })
      .catch((error) => console.log(error));
  };

  const onAddressChange = (address: string, raffle: any): void => {
    tickets.forEach((item: any, i: number) => (tickets[i].value = ''));

    if (EthersApi.isEthAddress(address)) {
      getAddressData(address, raffle);
    }
  };

  const countChances = (value: any, entered: any, items: any): any => {
    const supply: number = raffle.endDate.toSeconds() - DateTime.local().toSeconds() < 0 ? entered : +entered + +value;

    return (value / supply) * items;
  };

  const countWearablesChances = (ticket: any): any[] => {
    const wearables: any = ticket.prizes;

    if (wearables) {
      wearables.forEach((wearable: any) => {
        const perc = (wearable.quantity * 100) / ticket.items;
        const chance = (perc * ticket.chance) / 100;

        wearable.chance = chance;
      });
    }

    return wearables;
  };

  const getTicketsPreset = (tickets: any[]): any[] => {
    return tickets.map((ticket: any) => ({
      id: ticket,
      rarity: ItemUtils.getItemRarityName(ticket.toString()),
      value: ''
    }));
  };

  return (
    <RaffleContext.Provider
      value={{
        raffle,
        setRaffle,

        tickets,
        setTickets,

        getRaffleData,
        getAddressData,
        getTicketsPreset,

        onAddressChange,
        countChances,
        countWearablesChances,

        raffleSpinner,
        pricesSpinner
      }}
    >
      {props.children}
    </RaffleContext.Provider>
  );
};
