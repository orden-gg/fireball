import { TheGraphApi } from 'api';

import { AppThunk } from 'core/store/store';

import { GotchiLending, SortingItem } from 'shared/models';

import { CommonUtils } from 'utils';

import {
  loadBorrowedGotchis,
  loadBorrowedGotchisFailed,
  loadBorrowedGotchisSucceded,
  setIsInitialBorrowedGotchisLoading
} from '../slices';

export const onLoadBorrowedGotchis = (address: string): AppThunk => (dispatch, getState) => {
  dispatch(loadBorrowedGotchis());

  const { type, dir }: SortingItem = getState().client.borrowedGotchis.borrowedGotchisSorting;

  TheGraphApi.getBorrowedByAddress(address)
    .then((borrowedGotchis: GotchiLending[]) => {
      const sortedBorrowedGotchis: GotchiLending[] = CommonUtils.basicSort(borrowedGotchis, type, dir);

      dispatch(loadBorrowedGotchisSucceded(sortedBorrowedGotchis));
    })
    .catch(() => dispatch(loadBorrowedGotchisFailed()))
    .finally(() => dispatch(setIsInitialBorrowedGotchisLoading(false)));
};
