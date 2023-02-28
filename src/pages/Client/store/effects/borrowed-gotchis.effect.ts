import { AppThunk } from 'core/store/store';
import { GotchiLending, SortingItem } from 'shared/models';
import { TheGraphApi } from 'api';
import { CommonUtils } from 'utils';

import { loadBorrowedGotchis, loadBorrowedGotchisFailed, loadBorrowedGotchisSucceded } from '../slices';

export const onLoadBorrowedGotchis =
  (address: string): AppThunk =>
  (dispatch, getState) => {
    dispatch(loadBorrowedGotchis());

    const { type, dir }: SortingItem = getState().client.borrowedGotchis.borrowedGotchisSorting;

    TheGraphApi.getBorrowedByAddress(address)
      .then((lendings: GotchiLending[]) =>
        dispatch(loadBorrowedGotchisSucceded(CommonUtils.basicSort(lendings, type, dir)))
      )
      .catch(() => dispatch(loadBorrowedGotchisFailed()));
  };
