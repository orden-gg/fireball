import { TheGraphApi } from 'api';

import { AppThunk } from 'core/store/store';

import {
  FireballGotchi,
  GotchiLastChanneled,
  GotchiLending,
  GotchiLendingExtended,
  SortingItem,
  TheGraphBatchData
} from 'shared/models';

import { CommonUtils } from 'utils';

// slices
import * as lentGotchisSlices from '../slices/lent-gotchis.slice';

export const onLoadLentGotchis =
  (address: string): AppThunk =>
  (dispatch, getState) => {
    dispatch(lentGotchisSlices.loadLentGotchis());

    const { type, dir }: SortingItem = getState().client.lentGotchis.lentGotchisSorting;

    TheGraphApi.getLendingsByAddress(address).then((lentGotchis: GotchiLending[]) => {
      lentGotchis.forEach((lending: GotchiLending) => {
        lending.endTime = Number(lending.timeAgreed) + Number(lending.period);
      });

      const gotchiIds: string[] = lentGotchis.map((gotchi) => gotchi.id);
      TheGraphApi.getGotchisGotchiverseInfoByIds(gotchiIds)
        .then((gotchiIdsChanneled: GotchiLastChanneled[]) => {
          const modifiedLent: GotchiLending[] = lentGotchis.map((item: GotchiLending) => {
            const lastChanneledAlchemica = gotchiIdsChanneled.find((o: GotchiLastChanneled) => o.id === item.id);

            return {
              ...item,
              lastChanneledAlchemica: lastChanneledAlchemica?.lastChanneledAlchemica
                ? lastChanneledAlchemica?.lastChanneledAlchemica
                : '0'
            };
          });
          const sortedLentGotchis: GotchiLending[] = CommonUtils.basicSort(modifiedLent, type, dir);
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
    });
  };
