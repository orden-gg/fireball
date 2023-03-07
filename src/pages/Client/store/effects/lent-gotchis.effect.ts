import { RealmApi, TheGraphApi } from 'api';

import { AppThunk } from 'core/store/store';

import { GotchiLending, SortingItem } from 'shared/models';

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

        const promises: Promise<any>[] = lentGotchis.map((gotchi) => RealmApi.getGotchiLastChanneled(gotchi.id));
        Promise.all(promises).then((response) => {
          const modifiedlent = new Array();
          let i = 0;
          for (const gotchi of lentGotchis) {
            const modifiedGotchi = { ...gotchi, lastChanneling: response[i].toString() };
            modifiedlent.push(modifiedGotchi);
            i += 1;
          }

          const sortedLentGotchis: GotchiLending[] = CommonUtils.basicSort(modifiedlent, type, dir);

          dispatch(loadLentGotchisSucceded(sortedLentGotchis));
        });
      })
      .catch(() => dispatch(loadLentGotchisFailed()))
      .finally(() => dispatch(setIsInitialLentGotchisLoading(false)));
  };
