import { AppThunk } from 'core/store/store';
import { SortingItem } from 'shared/models';
import { TheGraphApi } from 'api';
import { CommonUtils } from 'utils';

import { OwnedGotchi } from '../../models';

import { loadOwnedGotchis, loadOwnedGotchisFailed, loadOwnedGotchisSucceded } from '../slices';

export const onLoadOwnedGotchis =
  (address: string): AppThunk =>
  (dispatch, getState) => {
    dispatch(loadOwnedGotchis());

    const { type, dir }: SortingItem = getState().client.ownedGotchis.ownedGotchisSorting;

    TheGraphApi.getGotchisByAddress(address)
      .then((ownedGotchis: OwnedGotchi[]) =>
        dispatch(loadOwnedGotchisSucceded(CommonUtils.basicSort(ownedGotchis, type, dir)))
      )
      .catch(() => dispatch(loadOwnedGotchisFailed()));
  };
