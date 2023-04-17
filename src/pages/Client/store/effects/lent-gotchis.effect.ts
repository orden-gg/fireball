import { TheGraphApi } from 'api';

import { AppThunk } from 'core/store/store';

import { FireballGotchi, GotchiLending, GotchiLendingExtended, SortingItem, TheGraphBatchData } from 'shared/models';

import { CommonUtils } from 'utils';

// slices
import * as lentGotchisSlices from '../slices/lent-gotchis.slice';

export const onLoadLentGotchis =
  (address: string): AppThunk =>
  (dispatch, getState) => {
    dispatch(lentGotchisSlices.loadLentGotchis());

    const { type, dir }: SortingItem = getState().client.lentGotchis.lentGotchisSorting;

    TheGraphApi.getLendingsByAddress(address)
      .then((lentGotchis: GotchiLending[]) => {
        lentGotchis.forEach((lending: GotchiLending) => {
          lending.endTime = Number(lending.timeAgreed) + Number(lending.period);
        });

        const sortedLentGotchis: GotchiLending[] = CommonUtils.basicSort(lentGotchis, type, dir);
        const gotchiIds: number[] = sortedLentGotchis.map((gotchi: GotchiLending) => Number(gotchi.id));

        if (gotchiIds.length > 0) {
          TheGraphApi.getFireballGotchisByIds(gotchiIds)
            .then((fireballGotchis: TheGraphBatchData<FireballGotchi>) => {
              const extendedLendingGotchis: GotchiLendingExtended[] = sortedLentGotchis.map(
                (lending: GotchiLending) => {
                  return { ...lending, ...fireballGotchis[`gotchi${lending.id}`] };
                }
              );

              dispatch(lentGotchisSlices.loadLentGotchisSucceded(extendedLendingGotchis));
            })
            .catch(() => {
              dispatch(lentGotchisSlices.loadLentGotchisFailed());
              dispatch(lentGotchisSlices.loadLentGotchisSucceded(sortedLentGotchis));
            })
            .finally(() => dispatch(lentGotchisSlices.setIsInitialLentGotchisLoading(false)));
        } else {
          dispatch(lentGotchisSlices.loadLentGotchisSucceded(sortedLentGotchis));
          dispatch(lentGotchisSlices.setIsInitialLentGotchisLoading(false));
        }
      })
      .catch(() => {
        dispatch(lentGotchisSlices.loadLentGotchisFailed());
        dispatch(lentGotchisSlices.setIsInitialLentGotchisLoading(false));
      });
  };
