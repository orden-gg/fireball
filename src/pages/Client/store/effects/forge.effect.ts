import { ClientApi } from 'pages/Client/api';

import { AppThunk } from 'core/store/store';

import { getForgeItemsByAddressQuery } from 'pages/Client/queries/forge-query';

// slices
import * as forgeSlices from '../slices/forge.slice';

export const onLoadForge =
  (address: string): AppThunk =>
  (dispatch) => {
    dispatch(forgeSlices.loadForgeItems());

    ClientApi.getForgeItems(getForgeItemsByAddressQuery(address))
      .then((res: CustomAny) => {
        dispatch(forgeSlices.loadForgeItemsSucceded(res.data.forgeItems));

        return res.data.forgeItems;
      })
      .catch(() => dispatch(forgeSlices.loadForgeItemsFailed()))
      .finally(() => dispatch(forgeSlices.setIsInitialForgeLoading(false)));
  };
