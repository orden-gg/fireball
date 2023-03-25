import { TheGraphApi } from 'api';

import { AppThunk } from 'core/store/store';

import { GotchiLastChanneled, GotchiLending, SortingItem } from 'shared/models';

import { CommonUtils } from 'utils';

// slices
import * as borrowedGotchisSlices from '../slices/borrowed-gotchis.slice';

export const onLoadBorrowedGotchis =
  (address: string): AppThunk =>
  (dispatch, getState) => {
    dispatch(borrowedGotchisSlices.loadBorrowedGotchis());

    const { type, dir }: SortingItem = getState().client.borrowedGotchis.borrowedGotchisSorting;

    TheGraphApi.getBorrowedByAddress(address).then((borrowedGotchis: GotchiLending[]) => {
      const gotchiIds: string[] = borrowedGotchis.map((gotchi) => gotchi.id);

      TheGraphApi.getGotchisGotchiverseInfoByIds(gotchiIds)
        .then((gotchiIdsChanneled: GotchiLastChanneled[]) => {
          const modifiedBorrowed = borrowedGotchis.map((item) => {
            const lastChanneled = gotchiIdsChanneled.find((o) => o.id === item.id);

            return { ...item, ...lastChanneled };
          });

          const sortedBorrowedGotchis: GotchiLending[] = CommonUtils.basicSort(modifiedBorrowed, type, dir);
          dispatch(borrowedGotchisSlices.loadBorrowedGotchisSucceded(sortedBorrowedGotchis));
        })
        .catch(() => dispatch(borrowedGotchisSlices.loadBorrowedGotchisFailed()))
        .finally(() => dispatch(borrowedGotchisSlices.setIsInitialBorrowedGotchisLoading(false)));
    });
  };
