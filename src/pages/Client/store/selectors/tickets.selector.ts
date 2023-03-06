import { RootState } from 'core/store/store';

import { ClientTicket } from '../../models';

export const getTickets = (state: RootState): ClientTicket[] => state.client.tickets.tickets.data;

export const getTicketsCount = (state: RootState): number => state.client.tickets.tickets.data.length;

export const getIsInitialTicketsLoading = (state: RootState): boolean => state.client.tickets.isInitialTicketsLoading;
