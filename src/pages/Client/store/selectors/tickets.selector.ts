import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { TicketsState } from '../slices';

const ticketsStateSelector = createSelector(
  (state: RootState) => state.client.tickets,
  (ticketsState: TicketsState) => ticketsState
);

export const getTickets = createSelector(ticketsStateSelector, (state: TicketsState) => state.tickets.data);

export const getTicketsCount = createSelector(ticketsStateSelector, (state: TicketsState) => state.tickets.data.length);

export const getIsInitialTicketsLoading = createSelector(
  ticketsStateSelector,
  (state: TicketsState) => state.isInitialTicketsLoading
);
