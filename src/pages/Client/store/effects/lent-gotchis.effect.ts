import { TheGraphApi } from 'api';
import { ClientApi } from 'pages/Client/api';

import { AppThunk } from 'core/store/store';

import { FireballGotchi, GotchiLending, GotchiLendingExtended, SortingItem, TheGraphBatchData } from 'shared/models';

import { CommonUtils, IdentityUtils } from 'utils';

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
        const ids: number[] = sortedLentGotchis.map((gotchi: GotchiLending) => Number(gotchi.id));

        if (ids.length > 0) {
          // TODO: Should be reworked when gotchi originalOwner will be fixed at FB graph
          ClientApi.getFireballGotchisByIds(ids)
            .then((fireballGotchis: TheGraphBatchData<FireballGotchi>[]) => {
              const extendedLendingGotchis: GotchiLendingExtended[] = sortedLentGotchis.map(
                (lending: GotchiLending) => {
                  return { ...lending, ...fireballGotchis[`gotchi${lending.id}`] };
                }
              );

              // TODO: Will be deleted as soon as thegraph updated
              IdentityUtils.getUpdatedIdentities(extendedLendingGotchis)
                .then((gotchis: CustomAny[]) => {
                  dispatch(lentGotchisSlices.loadLentGotchisSucceded(gotchis));
                })
                .finally(() => dispatch(lentGotchisSlices.setIsInitialLentGotchisLoading(false)));
            })
            .catch(() => dispatch(lentGotchisSlices.loadLentGotchisFailed()));
        } else {
          dispatch(lentGotchisSlices.loadLentGotchisSucceded([]));
          dispatch(lentGotchisSlices.setIsInitialLentGotchisLoading(false));
        }
      })
      .catch(() => dispatch(lentGotchisSlices.loadLentGotchisFailed()));
  };
