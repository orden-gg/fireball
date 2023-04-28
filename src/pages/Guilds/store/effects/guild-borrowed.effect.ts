import { TheGraphApi } from 'api';
import { GuildGraphApi } from 'pages/Guilds/api';

import { AppThunk } from 'core/store/store';

import { FireballGotchi, SortingItem, TheGraphBatchData } from 'shared/models';

import { GuildGotchiBorrowed, GuildGotchiBorrowedExtended } from 'pages/Guilds/models';

import { CommonUtils } from 'utils';

// slices
import * as borrowedGotchisSlices from '../slices/guild-borrowed.slice';

export const onLoadBorrowedGotchis =
  (addresses: string[]): AppThunk =>
  (dispatch, getState) => {
    dispatch(borrowedGotchisSlices.loadBorrowedGotchis());

    const { type, dir }: SortingItem = getState().client.borrowedGotchis.borrowedGotchisSorting;

    const promises: Promise<GuildGotchiBorrowed[]>[] = addresses.map((address: string) =>
      GuildGraphApi.getMemberBorrowedGotchis(address)
    );

    Promise.all(promises)
      .then((borrowedGotchis: GuildGotchiBorrowed[][]) => {
        const unitedGotchis: GuildGotchiBorrowed[] = borrowedGotchis.reduce(
          (result: GuildGotchiBorrowed[], current: GuildGotchiBorrowed[]) => result.concat(current),
          []
        );

        const sortedBorrowedGotchis: GuildGotchiBorrowed[] = CommonUtils.basicSort(unitedGotchis, type, dir);
        const gotchiIds: number[] = sortedBorrowedGotchis.map((gotchi: GuildGotchiBorrowed) => Number(gotchi.id));

        if (gotchiIds.length > 0) {
          TheGraphApi.getFireballGotchisByIds(gotchiIds)
            .then((fireballGotchis: TheGraphBatchData<FireballGotchi>) => {
              const extendedLendingGotchis: GuildGotchiBorrowedExtended[] = sortedBorrowedGotchis.map(
                (lending: GuildGotchiBorrowed) => {
                  return { ...lending, ...fireballGotchis[`gotchi${lending.id}`] };
                }
              );
              dispatch(borrowedGotchisSlices.loadBorrowedGotchisSucceded(extendedLendingGotchis));
            })
            .catch(() => {
              dispatch(borrowedGotchisSlices.loadBorrowedGotchisFailed());
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
  };
