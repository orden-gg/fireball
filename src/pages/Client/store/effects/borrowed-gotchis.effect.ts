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
          const modifiedBorrowed: GotchiLending[] = borrowedGotchis.map((item: GotchiLending) => {
            const lastChanneledAlchemica = gotchiIdsChanneled.find((o: GotchiLastChanneled) => o.id === item.id);

            return {
              ...item,
              lastChanneledAlchemica: lastChanneledAlchemica?.lastChanneledAlchemica
                ? lastChanneledAlchemica?.lastChanneledAlchemica
                : '0'
            };
          });

          const sortedBorrowedGotchis: GotchiLending[] = CommonUtils.basicSort(modifiedBorrowed, type, dir);
          dispatch(borrowedGotchisSlices.loadBorrowedGotchisSucceded(sortedBorrowedGotchis));
        })
        .catch(() => dispatch(borrowedGotchisSlices.loadBorrowedGotchisFailed()))
        .finally(() => dispatch(borrowedGotchisSlices.setIsInitialBorrowedGotchisLoading(false)));
    });
  };
