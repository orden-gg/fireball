import { createContext, useEffect, useState } from 'react';

import * as fromDataReloadStore from 'core/store/data-reload';
import { useAppDispatch, useAppSelector } from 'core/store/hooks';
// store
import * as fromClientStore from 'pages/Client/store';

import { PageNavLink } from 'shared/models';

import {
  AnvilIcon,
  BaazarIcon,
  FakeGotchisIcon,
  GotchiIcon,
  H1SealedPortalIcon,
  KekIcon,
  RareTicketIcon,
  WarehouseIcon
} from 'components/Icons/Icons';
import { SubNav } from 'components/PageNav/SubNav';

const loadedDefaultStates: { [key: string]: boolean } = {};

export const ClientContext = createContext({});

export const ClientContextProvider = (props: any) => {
  const dispatch = useAppDispatch();

  const ownedGotchisCount: number = useAppSelector(fromClientStore.getOwnedGotchisCount);
  const isOwnedGotchisLoading: boolean = useAppSelector(fromClientStore.getIsOwnedGotchisLoading);
  const lentGotchisCount: number = useAppSelector(fromClientStore.getLentGotchisCount);
  const isLentGotchisLoading: boolean = useAppSelector(fromClientStore.getIsLentGotchisLoading);
  const borrowedGotchisCount: number = useAppSelector(fromClientStore.getBorrowedGotchisCount);
  const isBorrowedGotchisLoading: boolean = useAppSelector(fromClientStore.getIsBorrowedGotchisLoading);
  const portalsCount: number = useAppSelector(fromClientStore.getPortalsCount);
  const isPortalsLoading: boolean = useAppSelector(fromClientStore.getIsPortalsLoading);
  const ticketsCount: number = useAppSelector(fromClientStore.getTicketsCount);
  const isTicketsLoading: boolean = useAppSelector(fromClientStore.getIsTicketsLoading);
  const warehouseCount: number = useAppSelector(fromClientStore.getWarehouseCount);
  const isWarehouseLoading: boolean = useAppSelector(fromClientStore.getIsWarehouseLoading);
  const installationsCount: number = useAppSelector(fromClientStore.getInstallationsCount);
  const isInstallationsLoading: boolean = useAppSelector(fromClientStore.getIsInstallationsLoading);
  const tilesCount: number = useAppSelector(fromClientStore.getTilesCount);
  const isTilesLoading: boolean = useAppSelector(fromClientStore.getIsTilesLoading);
  const realmCount: number = useAppSelector(fromClientStore.getRealmCount);
  const isRealmLoading: boolean = useAppSelector(fromClientStore.getIsRealmLoading);
  const fakeGotchisCount: number = useAppSelector(fromClientStore.getFakeGotchisCount);
  const itemsForSaleCount: number = useAppSelector(fromClientStore.getItemsForSaleCount);
  const isItemsForSaleLoading: boolean = useAppSelector(fromClientStore.getIsItemsForSaleLoading);

  const [canBeUpdated, setCanBeUpdated] = useState<boolean>(false);
  const [loadedStates, setLoadedStates] = useState<{ [key: string]: boolean }>(loadedDefaultStates);

  const navData: PageNavLink[] = [
    {
      name: 'gotchis',
      path: 'gotchis',
      icon: <GotchiIcon width={24} height={24} />,
      isLoading: isOwnedGotchisLoading || isLentGotchisLoading || isBorrowedGotchisLoading,
      count: ownedGotchisCount + borrowedGotchisCount,
      isShowSubRoutes: true,
      subNavComponent: (
        <SubNav
          links={[
            {
              name: 'owned',
              path: 'gotchis/owned',
              isLoading: isOwnedGotchisLoading,
              count: ownedGotchisCount
            },
            {
              name: 'lendings',
              path: 'gotchis/lended',
              isLoading: isLentGotchisLoading,
              count: lentGotchisCount
            },
            {
              name: 'borrowed',
              path: 'gotchis/borrowed',
              isLoading: isBorrowedGotchisLoading,
              count: borrowedGotchisCount
            }
          ]}
        />
      )
    },
    {
      name: 'portals',
      path: 'portals',
      icon: <H1SealedPortalIcon width={24} height={24} />,
      isLoading: isPortalsLoading,
      count: portalsCount
    },
    {
      name: 'warehouse',
      path: 'warehouse',
      icon: <WarehouseIcon width={24} height={24} />,
      isLoading: isWarehouseLoading,
      count: warehouseCount
    },
    {
      name: 'installations',
      path: 'installations',
      icon: <AnvilIcon width={24} height={24} />,
      isLoading: isInstallationsLoading || isTilesLoading,
      count: installationsCount + tilesCount
    },
    {
      name: 'tickets',
      path: 'tickets',
      icon: <RareTicketIcon width={24} height={24} />,
      isLoading: isTicketsLoading,
      count: ticketsCount
    },
    {
      name: 'realm',
      path: 'realm',
      icon: <KekIcon width={24} height={24} alt='realm' />,
      isLoading: isRealmLoading,
      count: realmCount
    },
    {
      name: 'fake gotchis',
      path: 'fake-gotchis',
      icon: <FakeGotchisIcon width={24} height={24} />,
      isLoading: false,
      count: fakeGotchisCount
    },
    {
      name: 'for sale',
      path: 'for-sale',
      icon: <BaazarIcon width={24} height={24} />,
      isLoading: isItemsForSaleLoading,
      count: itemsForSaleCount
    }
  ];

  useEffect(() => {
    const isAllLoaded = Object.keys(loadedStates).every((key) => loadedStates[key]);

    if (isAllLoaded) {
      dispatch(fromDataReloadStore.setLastUpdatedTimestamp(Date.now()));
      dispatch(fromDataReloadStore.setIsReloadDisabled(false));
      setCanBeUpdated(true);
    } else {
      dispatch(fromDataReloadStore.setIsReloadDisabled(true));
      setCanBeUpdated(false);
    }
  }, [loadedStates]);

  const getClientData = (address: string): void => {
    dispatch(fromClientStore.onLoadClientData(address));
  };

  return (
    <ClientContext.Provider
      value={{
        navData,
        getClientData,

        canBeUpdated,
        setCanBeUpdated,
        setLoadedStates
      }}
    >
      {props.children}
    </ClientContext.Provider>
  );
};
