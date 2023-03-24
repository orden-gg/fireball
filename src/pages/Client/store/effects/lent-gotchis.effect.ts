import { TheGraphApi } from 'api';
import { ClientApi } from 'pages/Client/api';

import { AppThunk } from 'core/store/store';

import { FireballGotchi, GotchiLending, GotchiLendingExtended, SortingItem, TheGraphBatchData } from 'shared/models';

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

        if (ids.length > 0) {
          // Should be reworked when gotchi originalOwner will be fixed at FB graph
          ClientApi.getFireballGotchisByIds(ids)
            .then((fireballGotchis: TheGraphBatchData<FireballGotchi>[]) => {
              const extendedLendingGotchis: GotchiLendingExtended[] = sortedLentGotchis.map(
                (lending: GotchiLending) => {
                  return { ...lending, ...fireballGotchis[`gotchi${lending.id}`] };
                }
              );

              dispatch(loadLentGotchisSucceded(extendedLendingGotchis));
            })
            .catch(() => dispatch(loadLentGotchisFailed()))
            .finally(() => dispatch(setIsInitialLentGotchisLoading(false)));
        } else {
          dispatch(setIsInitialLentGotchisLoading(false));
        }
      })
      .catch(() => dispatch(loadLentGotchisFailed()));
  };
