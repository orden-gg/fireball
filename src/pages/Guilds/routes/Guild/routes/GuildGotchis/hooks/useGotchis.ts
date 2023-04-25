import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import * as fromGuildsStore from 'pages/Guilds/store';

import { GotchiTypeNames } from 'pages/Guilds/constants';

const selectors = {
  owned: {
    gotchis: fromGuildsStore.getOwnedGotchis,
    count: fromGuildsStore.getOwnedGotchisCount,
    isLoaded: fromGuildsStore.getIsGotchisDataLoaded,
    ownedGotchisSorting: fromGuildsStore.getOwnedGotchisSorting
  },
  borrowed: {
    gotchis: fromGuildsStore.getBorrowedGotchis,
    count: fromGuildsStore.getBorrowedGotchisCount,
    isLoaded: fromGuildsStore.getIsBorrowedGotchisDataLoaded,
    borrowedGotchisSorting: fromGuildsStore.getOwnedGotchisSorting
  },
  lentout: {
    gotchis: fromGuildsStore.getLentGotchis,
    count: fromGuildsStore.getLentGotchisCount,
    isLoaded: fromGuildsStore.getIsLentGotchisDataLoaded,
    borrowedGotchisSorting: fromGuildsStore.getLentGotchisSorting
  }
};

export function useGotchis(type: GotchiTypeNames): CustomAny {
  const dispatch = useAppDispatch();

  const currentGuild = useAppSelector(fromGuildsStore.getCurrentGuild);

  const [gotchis, gotchisCount, isGotchisLoaded, defaultSorting] = Object.entries(selectors[type]).map(([, value]) =>
    useAppSelector(value as CustomAny)
  );

  useEffect(() => {
    if (currentGuild && currentGuild.members?.length > 0) {
      if (type === GotchiTypeNames.Owned) {
        dispatch(fromGuildsStore.onLoadOwnedGotchis(currentGuild.members));
      } else if (type === GotchiTypeNames.Borrowed) {
        dispatch(fromGuildsStore.onLoadBorrowedGotchis(currentGuild.members));
      }
    }
  }, [currentGuild]);

  return {
    gotchis,
    gotchisCount,
    isGotchisLoaded,
    defaultSorting
  };
}
