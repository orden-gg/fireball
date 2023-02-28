import { AppThunk } from 'core/store/store';
import { ClientGotchiLending, SortingItem } from 'shared/models';
import { TheGraphApi } from 'api';
import { CommonUtils } from 'utils';

import { loadLentGotchis, loadLentGotchisFailed, loadLentGotchisSucceded } from '../slices';

export const onLoadLentGotchis =
  (address: string): AppThunk =>
  (dispatch, getState) => {
    dispatch(loadLentGotchis());

    const lentGotchisSorting: SortingItem = getState().client.lentGotchis.lentGotchisSorting;

    TheGraphApi.getLendingsByAddress(address)
      .then((lendings: ClientGotchiLending[]) => {
        const { type, dir }: SortingItem = lentGotchisSorting;

        lendings.forEach((lending: ClientGotchiLending) => {
          lending.endTime = Number(lending.timeAgreed) + Number(lending.period);
        });

        dispatch(loadLentGotchisSucceded(CommonUtils.basicSort(lendings, type, dir)));
      })
      .catch(() => {
        dispatch(loadLentGotchisFailed());
      });
  };
