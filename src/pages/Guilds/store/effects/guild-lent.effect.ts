import { TheGraphApi } from 'api';
import { GuildGraphApi } from 'pages/Guilds/api';

import { AppThunk } from 'core/store/store';

import { FireballGotchi, SortingItem, TheGraphBatchData } from 'shared/models';

import { GuildGotchiLent, GuildGotchiLentExtended } from 'pages/Guilds/models';

import { CommonUtils } from 'utils';

// slices
import * as lentGotchisSlices from '../slices/guild-lent.slice';

export const onLoadLentGotchis =
  (addresses: string[]): AppThunk =>
  (dispatch, getState) => {
    dispatch(lentGotchisSlices.loadLentGotchis());

    const { type, dir }: SortingItem = getState().client.lentGotchis.lentGotchisSorting;

    const promises: Promise<GuildGotchiLent[]>[] = addresses.map((address: string) =>
      GuildGraphApi.getMemberLentGotchis(address)
    );

    Promise.all(promises)
      .then((lentGotchis: GuildGotchiLent[][]) => {
        const unitedGotchis: GuildGotchiLent[] = lentGotchis.reduce(
          (result: GuildGotchiLent[], current: GuildGotchiLent[]) => result.concat(current),
          []
        );

        unitedGotchis.forEach((lending: GuildGotchiLent) => {
          lending.endTime = Number(lending.timeAgreed) + Number(lending.period);
        });

        const sortedLentGotchis: GuildGotchiLent[] = CommonUtils.basicSort(unitedGotchis, type, dir);
        const gotchiIds: number[] = sortedLentGotchis.map((gotchi: GuildGotchiLent) => Number(gotchi.id));

        if (gotchiIds.length > 0) {
          TheGraphApi.getFireballGotchisByIds(gotchiIds)
            .then((fireballGotchis: TheGraphBatchData<FireballGotchi>) => {
              const extendedLendingGotchis: GuildGotchiLentExtended[] = sortedLentGotchis.map(
                (lending: GuildGotchiLent) => {
                  return { ...lending, ...fireballGotchis[`gotchi${lending.id}`] };
                }
              );

              dispatch(lentGotchisSlices.loadLentGotchisSucceded(extendedLendingGotchis));
            })
            .catch(() => {
              dispatch(lentGotchisSlices.loadLentGotchisFailed());
            })
            .finally(() => dispatch(lentGotchisSlices.setIsInitialLentGotchisLoading(false)));
        } else {
          dispatch(lentGotchisSlices.loadLentGotchisSucceded([]));
          dispatch(lentGotchisSlices.setIsInitialLentGotchisLoading(false));
        }
      })
      .catch(() => {
        dispatch(lentGotchisSlices.loadLentGotchisFailed());
        dispatch(lentGotchisSlices.setIsInitialLentGotchisLoading(false));
      })
      .finally(() => dispatch(lentGotchisSlices.setIsInitialLentGotchisLoading(false)));
  };
