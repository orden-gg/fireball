import { TheGraphApi } from 'api';

import { AppThunk } from 'core/store/store';

import { GotchiLending, SortingItem } from 'shared/models';

import { CommonUtils } from 'utils';

import {
  loadLentGotchis,
  loadLentGotchisFailed,
  loadLentGotchisSucceded,
  setIsInitialLentGotchisLoading
} from '../slices';

export const onLoadLentGotchis = (address: string): AppThunk => (dispatch, getState) => {
  dispatch(loadLentGotchis());

  const { type, dir }: SortingItem = getState().client.lentGotchis.lentGotchisSorting;

  TheGraphApi.getLendingsByAddress(address)
    .then((lentGotchis: GotchiLending[]) => {
      lentGotchis.forEach((lending: GotchiLending) => {
        lending.endTime = Number(lending.timeAgreed) + Number(lending.period);
      });

      const sortedLentGotchis: GotchiLending[] = CommonUtils.basicSort(lentGotchis, type, dir);

      dispatch(loadLentGotchisSucceded(sortedLentGotchis));
    })
    .catch(() => dispatch(loadLentGotchisFailed()))
    .finally(() => dispatch(setIsInitialLentGotchisLoading(false)));
};
