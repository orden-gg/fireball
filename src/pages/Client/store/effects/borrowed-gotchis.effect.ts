import { TheGraphApi } from 'api';

import { AppThunk } from 'core/store/store';

import {
  FireballGotchi,
  GotchiLastChanneled,
  GotchiLending,
  GotchiLendingExtended,
  SortingItem,
  TheGraphBatchData
} from 'shared/models';

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
            const originalOwnerId = item.gotchi.originalOwner.id;

            return {
              ...item,
              lastChanneledAlchemica: lastChanneledAlchemica?.lastChanneledAlchemica
                ? lastChanneledAlchemica?.lastChanneledAlchemica
                : '0',
              originalOwnerId: originalOwnerId ? originalOwnerId : ''
            };
          });

          const sortedBorrowedGotchis: GotchiLending[] = CommonUtils.basicSort(modifiedBorrowed, type, dir);
          const gotchiIds: number[] = sortedBorrowedGotchis.map((gotchi: GotchiLending) => Number(gotchi.id));

          if (gotchiIds.length > 0) {
            TheGraphApi.getFireballGotchisByIds(gotchiIds)
              .then((fireballGotchis: TheGraphBatchData<FireballGotchi>) => {
                const extendedLendingGotchis: GotchiLendingExtended[] = sortedBorrowedGotchis.map(
                  (lending: GotchiLending) => {
                    return { ...lending, ...fireballGotchis[`gotchi${lending.id}`] };
                  }
                );
                dispatch(borrowedGotchisSlices.loadBorrowedGotchisSucceded(extendedLendingGotchis));
              })
              .catch(() => {
                dispatch(borrowedGotchisSlices.loadBorrowedGotchisFailed());
                dispatch(borrowedGotchisSlices.loadBorrowedGotchisSucceded(sortedBorrowedGotchis));
              })
              .finally(() => dispatch(borrowedGotchisSlices.setIsInitialBorrowedGotchisLoading(false)));
          } else {
            dispatch(borrowedGotchisSlices.loadBorrowedGotchisSucceded([]));
            dispatch(borrowedGotchisSlices.setIsInitialBorrowedGotchisLoading(false));
          }
        })
        .catch(() => {
          dispatch(borrowedGotchisSlices.loadBorrowedGotchisFailed());
          dispatch(borrowedGotchisSlices.setIsInitialBorrowedGotchisLoading(false));
        });
    });
  };
