import { TheGraphApi } from 'api';

import { AppThunk } from 'core/store/store';

import { FBGotchi, GotchiLending, GotchiLendingExtended, SortingItem, TheGraphBatchData } from 'shared/models';

import { CommonUtils } from 'utils';

import {
  loadBorrowedGotchis,
  loadBorrowedGotchisFailed,
  loadBorrowedGotchisSucceded,
  setIsInitialBorrowedGotchisLoading
} from '../slices';

export const onLoadBorrowedGotchis =
  (address: string): AppThunk =>
  (dispatch, getState) => {
    dispatch(loadBorrowedGotchis());

    const { type, dir }: SortingItem = getState().client.borrowedGotchis.borrowedGotchisSorting;

    TheGraphApi.getBorrowedByAddress(address)
      .then((borrowedGotchis: GotchiLending[]) => {
        const sortedBorrowedGotchis: GotchiLending[] = CommonUtils.basicSort(borrowedGotchis, type, dir);
        const ids: number[] = sortedBorrowedGotchis.map((gotchi: GotchiLending) => Number(gotchi.id));

        // Should be reworked when gotchi originalOwner will be fixed at FB graph
        TheGraphApi.getFBGotchisByIds(ids)
          .then((FBGotchis: TheGraphBatchData<FBGotchi>[]) => {
            const extendedLendingGotchis: GotchiLendingExtended[] = sortedBorrowedGotchis.map(
              (lending: GotchiLending) => {
                return { ...lending, ...FBGotchis[`gotchi${lending.id}`] };
              }
            );

            dispatch(loadBorrowedGotchisSucceded(extendedLendingGotchis));
          })
          .catch(() => dispatch(loadBorrowedGotchisFailed()))
          .finally(() => dispatch(setIsInitialBorrowedGotchisLoading(false)));
      })
      .catch(() => dispatch(loadBorrowedGotchisFailed()));
  };
