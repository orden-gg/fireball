import { TheGraphApi } from 'api';

import { AppThunk } from 'core/store/store';

import { FBGotchi, GotchiLending, GotchiLendingExtended, SortingItem, TheGraphBatchData } from 'shared/models';

import { CommonUtils } from 'utils';

import {
  loadLentGotchis,
  loadLentGotchisFailed,
  loadLentGotchisSucceded,
  setIsInitialLentGotchisLoading
} from '../slices';

export const onLoadLentGotchis =
  (address: string): AppThunk =>
  (dispatch, getState) => {
    dispatch(loadLentGotchis());

    const { type, dir }: SortingItem = getState().client.lentGotchis.lentGotchisSorting;

    TheGraphApi.getLendingsByAddress(address)
      .then((lentGotchis: GotchiLending[]) => {
        lentGotchis.forEach((lending: GotchiLending) => {
          lending.endTime = Number(lending.timeAgreed) + Number(lending.period);
        });

        const sortedLentGotchis: GotchiLending[] = CommonUtils.basicSort(lentGotchis, type, dir);
        const ids: number[] = sortedLentGotchis.map((gotchi: GotchiLending) => Number(gotchi.id));

        // Should be reworked when gotchi originalOwner will be fixed at FB graph
        TheGraphApi.getFBGotchisByIds(ids)
          .then((FBGotchis: TheGraphBatchData<FBGotchi>[]) => {
            const extendedLendingGotchis: GotchiLendingExtended[] = sortedLentGotchis.map((lending: GotchiLending) => {
              return { ...lending, ...FBGotchis[`gotchi${lending.id}`] };
            });

            dispatch(loadLentGotchisSucceded(extendedLendingGotchis));
          })
          .catch(() => dispatch(loadLentGotchisFailed()))
          .finally(() => dispatch(setIsInitialLentGotchisLoading(false)));
      })
      .catch(() => dispatch(loadLentGotchisFailed()));
  };
