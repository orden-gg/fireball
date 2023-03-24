import { TheGraphApi } from 'api';
import { ClientApi } from 'pages/Client/api';

import { AppThunk } from 'core/store/store';

import { FireballGotchi, GotchiLending, GotchiLendingExtended, SortingItem, TheGraphBatchData } from 'shared/models';

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

        if (ids.length > 0) {
          // Should be reworked when gotchi originalOwner will be fixed at FB graph
          ClientApi.getFireballGotchisByIds(ids)
            .then((fireballGotchis: TheGraphBatchData<FireballGotchi>[]) => {
              const extendedLendingGotchis: GotchiLendingExtended[] = sortedBorrowedGotchis.map(
                (lending: GotchiLending) => {
                  return { ...lending, ...fireballGotchis[`gotchi${lending.id}`] };
                }
              );

              dispatch(loadBorrowedGotchisSucceded(extendedLendingGotchis));
            })
            .catch(() => dispatch(loadBorrowedGotchisFailed()))
            .finally(() => dispatch(setIsInitialBorrowedGotchisLoading(false)));
        } else {
          dispatch(setIsInitialBorrowedGotchisLoading(false));
        }
      })
      .catch(() => dispatch(loadBorrowedGotchisFailed()));
  };
