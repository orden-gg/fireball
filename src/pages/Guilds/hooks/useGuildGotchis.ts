import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import * as fromGuildsStore from 'pages/Guilds/store';

import { GuildRouteNames } from 'pages/Guilds/constants';

const selectors = {
  owned: {
    gotchis: fromGuildsStore.getOwnedGotchis,
    gotchisCount: fromGuildsStore.getOwnedGotchisCount,
    isGotchisLoaded: fromGuildsStore.getIsOwnedGotchisLoaded,
    defaultSorting: fromGuildsStore.getOwnedGotchisSorting
  },
  borrowed: {
    gotchis: fromGuildsStore.getBorrowedGotchis,
    gotchisCount: fromGuildsStore.getBorrowedGotchisCount,
    isGotchisLoaded: fromGuildsStore.getIsBorrowedGotchisLoaded,
    defaultSorting: fromGuildsStore.getBorrowedGotchisSorting
  },
  lended: {
    gotchis: fromGuildsStore.getLentGotchis,
    gotchisCount: fromGuildsStore.getLentGotchisCount,
    isGotchisLoaded: fromGuildsStore.getIsLentGotchisLoaded,
    defaultSorting: fromGuildsStore.getLentGotchisSorting
  }
};

export function useGotchis(type: GuildRouteNames): CustomAny {
  const dispatch = useAppDispatch();

  const currentGuild: CustomAny = useAppSelector(fromGuildsStore.getCurrentGuild);

  useEffect(() => {
    if (currentGuild && currentGuild.members?.length > 0) {
      switch (type) {
        case GuildRouteNames.Owned:
          dispatch(fromGuildsStore.onLoadOwnedGotchis(currentGuild.members));
          break;
        case GuildRouteNames.Borrowed:
          dispatch(fromGuildsStore.onLoadBorrowedGotchis(currentGuild.members));
          break;
        case GuildRouteNames.Lended:
          dispatch(fromGuildsStore.onLoadLentGotchis(currentGuild.members));
          break;
      }
    }
  }, [currentGuild, type]);

  return {
    gotchis: useAppSelector(selectors[type].gotchis as CustomAny),
    gotchisCount: useAppSelector(selectors[type].gotchisCount),
    isGotchisLoaded: useAppSelector(selectors[type].isGotchisLoaded),
    defaultSorting: useAppSelector(selectors[type].defaultSorting)
  };
}
