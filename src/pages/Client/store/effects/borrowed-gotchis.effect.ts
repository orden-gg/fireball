import { TheGraphApi } from 'api';
import { ClientApi } from 'pages/Client/api';

import { AppThunk } from 'core/store/store';

import { FireballGotchi, GotchiLending, GotchiLendingExtended, SortingItem, TheGraphBatchData } from 'shared/models';

import { CommonUtils, IdentityUtils } from 'utils';

// slices
import * as borrowedGotchisSlices from '../slices/borrowed-gotchis.slice';

export const onLoadBorrowedGotchis =
  (address: string): AppThunk =>
  (dispatch, getState) => {
    dispatch(borrowedGotchisSlices.loadBorrowedGotchis());

    const { type, dir }: SortingItem = getState().client.borrowedGotchis.borrowedGotchisSorting;

    TheGraphApi.getBorrowedByAddress(address)
      .then((borrowedGotchis: GotchiLending[]) => {
        const sortedBorrowedGotchis: GotchiLending[] = CommonUtils.basicSort(borrowedGotchis, type, dir);
        const ids: number[] = sortedBorrowedGotchis.map((gotchi: GotchiLending) => Number(gotchi.id));

        if (ids.length > 0) {
          // TODO: Should be reworked when gotchi originalOwner will be fixed at FB graph
          ClientApi.getFireballGotchisByIds(ids)
            .then((fireballGotchis: TheGraphBatchData<FireballGotchi>[]) => {
              const extendedLendingGotchis: GotchiLendingExtended[] = sortedBorrowedGotchis.map(
                (lending: GotchiLending) => {
                  return { ...lending, ...fireballGotchis[`gotchi${lending.id}`] };
                }
              );

              // TODO: Will be deleted as soon as thegraph updated
              IdentityUtils.getUpdatedIdentities(extendedLendingGotchis)
                .then((gotchis: CustomAny[]) => {
                  dispatch(borrowedGotchisSlices.loadBorrowedGotchisSucceded(gotchis));
                })
                .finally(() => dispatch(borrowedGotchisSlices.setIsInitialBorrowedGotchisLoading(false)));
            })
            .catch(() => dispatch(borrowedGotchisSlices.loadBorrowedGotchisFailed()));
        } else {
          dispatch(borrowedGotchisSlices.loadBorrowedGotchisSucceded([]));
          dispatch(borrowedGotchisSlices.setIsInitialBorrowedGotchisLoading(false));
        }
      })
      .catch(() => dispatch(borrowedGotchisSlices.loadBorrowedGotchisFailed()));
  };
