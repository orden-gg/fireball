import { ClientApi } from 'pages/Client/api';

import { AppThunk } from 'core/store/store';

import { ForgeItem } from 'shared/models';

import { getForgeItemsByAddressQuery } from 'pages/Client/queries/forge-query';

// slices
import * as forgeSlices from '../slices/forge.slice';

export const onLoadForge =
  (address: string): AppThunk =>
  (dispatch) => {
    dispatch(forgeSlices.loadForgeItems());

    ClientApi.getForgeItems(getForgeItemsByAddressQuery(address))
      .then((forgeItems: ForgeItem[]) => {
        dispatch(forgeSlices.loadForgeItemsSucceded(forgeItems));

        return forgeItems;
      })
      .catch(() => dispatch(forgeSlices.loadForgeItemsFailed()))
      .finally(() => dispatch(forgeSlices.setIsInitialForgeLoading(false)));
  };
