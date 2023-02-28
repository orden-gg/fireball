import { AppThunk } from 'core/store/store';
import { GotchiLending, SortingItem } from 'shared/models';
import { TheGraphApi } from 'api';
import { CommonUtils } from 'utils';

import { loadLentGotchis, loadLentGotchisFailed, loadLentGotchisSucceded } from '../slices';

export const onLoadLentGotchis =
  (address: string): AppThunk =>
  (dispatch, getState) => {
    dispatch(loadLentGotchis());

    const { type, dir }: SortingItem = getState().client.lentGotchis.lentGotchisSorting;

    TheGraphApi.getLendingsByAddress(address)
      .then((lendings: GotchiLending[]) => {
        lendings.forEach((lending: GotchiLending) => {
          lending.endTime = Number(lending.timeAgreed) + Number(lending.period);
        });

        dispatch(loadLentGotchisSucceded(CommonUtils.basicSort(lendings, type, dir)));
      })
      .catch(() => dispatch(loadLentGotchisFailed()));
  };
