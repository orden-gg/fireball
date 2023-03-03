import { TicketsApi } from 'api';

import { AppThunk } from 'core/store/store';

import { ClientTicket, ContractTicket } from '../../models';
import { loadTickets, loadTicketsFailed, loadTicketsSucceded } from '../slices';

export const onLoadTickets =
  (address: string): AppThunk =>
  (dispatch) => {
    dispatch(loadTickets());

    TicketsApi.getTicketsByAddress(address)
      .then((response: ContractTicket[]) => {
        const modifiedTickets: ClientTicket[] = response.filter((item: ContractTicket) => item.balance > 0);

        dispatch(loadTicketsSucceded(modifiedTickets));
      })
      .catch(() => dispatch(loadTicketsFailed()));
  };
