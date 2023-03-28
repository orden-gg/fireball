import { RealmApi, TheGraphApi } from 'api';

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
      // const gotchiIds: string[] = borrowedGotchis.map((gotchi) => gotchi.id);
      // TheGraphApi.getGotchisGotchiverseInfoByIds(gotchiIds)
      //   .then((gotchiIdsChanneled: GotchiLastChanneled[]) => {
      //     const modifiedBorrowed: GotchiLending[] = borrowedGotchis.map((item: GotchiLending) => {
      //       const lastChanneled = gotchiIdsChanneled.find((o: GotchiLastChanneled) => o.id === item.id);
      //       debugger;
      //       console.log('lastChanneled', lastChanneled);
      //       return { ...item, lastChanneled: lastChanneled?.lastChanneled ? lastChanneled?.lastChanneled : '0' };
      //     });

      const promises: Promise<CustomAny>[] = borrowedGotchis.map((gotchi) =>
        RealmApi.getGotchiLastChanneled(gotchi.id)
      );
      Promise.all(promises)
        .then((response: GotchiLastChanneled[]) => {
          const modifiedBorrowed: GotchiLending[] = [];
          let i = 0;
          for (const gotchi of borrowedGotchis) {
            const modifiedGotchi = { ...gotchi, lastChanneled: response[i].toString() ? response[i].toString() : '0' };
            modifiedBorrowed.push(modifiedGotchi);
            i += 1;
          }

          const sortedBorrowedGotchis: GotchiLending[] = CommonUtils.basicSort(modifiedBorrowed, type, dir);
          dispatch(borrowedGotchisSlices.loadBorrowedGotchisSucceded(sortedBorrowedGotchis));
        })
        .catch(() => dispatch(borrowedGotchisSlices.loadBorrowedGotchisFailed()))
        .finally(() => dispatch(borrowedGotchisSlices.setIsInitialBorrowedGotchisLoading(false)));
    });
  };
