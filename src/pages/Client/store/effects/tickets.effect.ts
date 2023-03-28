import { TicketsApi } from 'api';

import { AppThunk } from 'core/store/store';

import { ClientTicket, ContractTicket } from '../../models';
// slices
import * as ticketsSlices from '../slices/tickets.slice';

export const onLoadTickets =
  (address: string): AppThunk =>
  (dispatch) => {
    dispatch(ticketsSlices.loadTickets());

    TicketsApi.getTicketsByAddress(address)
      .then((response: ContractTicket[]) => {
        const modifiedTickets: ClientTicket[] = response.filter((item: ContractTicket) => item.balance > 0);

        dispatch(ticketsSlices.loadTicketsSucceded(modifiedTickets));
      })
      .catch(() => dispatch(ticketsSlices.loadTicketsFailed()))
      .finally(() => dispatch(ticketsSlices.setIsInitialTicketsLoading(false)));
  };
