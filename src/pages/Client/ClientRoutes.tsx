import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';

import queryString from 'query-string';

import { EthersApi } from 'api';

import * as fromClientStore from './store';
// store
import * as fromDataReloadStore from 'core/store/data-reload';
import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import { getActiveAddress, setActiveAddress } from 'core/store/login';

import { DataReloadType } from 'shared/constants';
import { PageNavLink } from 'shared/models';

import { RealmSwitchButton } from 'pages/Client/components/RealmSwitchButton/RealmSwitchButton';

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
import { PageNav } from 'components/PageNav/PageNav';
import { SubNav } from 'components/PageNav/SubNav';

import { CommonUtils } from 'utils';

import { RealmView } from './constants';
import { ClientAccount } from './routes/ClientAccount';
import { ClientFakeGotchis } from './routes/ClientFakeGotchis';
import { ClientForSale } from './routes/ClientForSale';
import { ClientGotchis } from './routes/ClientGotchis';
import { ClientInstallations } from './routes/ClientInstallations';
import { ClientPortals } from './routes/ClientPortals';
import { ClientRealm } from './routes/ClientRealm';
import { ClientTickets } from './routes/ClientTickets';
import { ClientWarehouse } from './routes/ClientWarehouse';
import { styles } from './styles';

const queryParamsOrder: string[] = ['haunt', 'collateral', 'search', 'sort', 'dir'];

export function ClientRoutes() {
  const classes = styles();

  const navigate = useNavigate();
  const location = useLocation();

  const subroute = location.pathname
    .split('/')
    .slice(3)
    .join('/');

  const { account } = useParams<{ account: string }>();
  const queryParams = queryString.parse(location.search);

  const dispatch = useAppDispatch();

  const lastManuallyTriggeredTimestamp: number = useAppSelector(fromDataReloadStore.getLastManuallyTriggeredTimestamp);
  const isReloadDisabled: boolean = useAppSelector(fromDataReloadStore.getIsReloadDisabled);
  const activeAddress: Undefinable<string | null> = useAppSelector(getActiveAddress);

  // client store selectors
  const ownedGotchisCount: number = useAppSelector(fromClientStore.getOwnedGotchisCount);
  const isInitialOwnedGotchisLoading: boolean = useAppSelector(fromClientStore.getIsInitialOwnedGotchisLoading);
  const lentGotchisCount: number = useAppSelector(fromClientStore.getLentGotchisCount);
  const isInitialLentGotchisLoading: boolean = useAppSelector(fromClientStore.getIsInitialLentGotchisLoading);
  const borrowedGotchisCount: number = useAppSelector(fromClientStore.getBorrowedGotchisCount);
  const isInitialBorrowedGotchisLoading: boolean = useAppSelector(fromClientStore.getIsInitialBorrowedGotchisLoading);
  const portalsCount: number = useAppSelector(fromClientStore.getPortalsCount);
  const isInitialPortalsLoading: boolean = useAppSelector(fromClientStore.getIsInitialPortalsLoading);
  const ticketsCount: number = useAppSelector(fromClientStore.getTicketsCount);
  const isInitialTicketsLoading: boolean = useAppSelector(fromClientStore.getIsInitialTicketsLoading);
  const warehouseCount: number = useAppSelector(fromClientStore.getWarehouseCount);
  const isInitialWarehouseLoading: boolean = useAppSelector(fromClientStore.getIsInitialWarehouseLoading);
  const installationsCount: number = useAppSelector(fromClientStore.getInstallationsCount);
  const isInitialInstallationsLoading: boolean = useAppSelector(fromClientStore.getIsInitialInstallationsLoading);
  const tilesCount: number = useAppSelector(fromClientStore.getTilesCount);
  const isInitialTilesLoading: boolean = useAppSelector(fromClientStore.getIsInitialTilesLoading);
  const realmCount: number = useAppSelector(fromClientStore.getRealmCount);
  const isInitialRealmLoading: boolean = useAppSelector(fromClientStore.getIsInitialRealmLoading);
  const realmView: RealmView = useAppSelector(fromClientStore.getRealmView);
  const fakeGotchisCount: number = useAppSelector(fromClientStore.getFakeGotchisCount);
  const isInitialFakeGotchisLoading: boolean = useAppSelector(fromClientStore.getIsInitialFakeGotchisLoading);
  const itemsForSaleCount: number = useAppSelector(fromClientStore.getItemsForSaleCount);
  const isInitialItemsForSaleLoading: boolean = useAppSelector(fromClientStore.getIsInitialItemsForSaleLoading);

  const isClientDataLoading: boolean = useAppSelector(fromClientStore.getIsClientDataLoading);

  const [isActiveAddressSet, setIsActiveAddressSet] = useState<boolean>(false);

  const navData: PageNavLink[] = [
    {
      name: 'gotchis',
      path: 'gotchis',
      icon: <GotchiIcon width={24} height={24} />,
      isLoading: isInitialOwnedGotchisLoading || isInitialLentGotchisLoading || isInitialBorrowedGotchisLoading,
      count: ownedGotchisCount + borrowedGotchisCount,
      isShowSubRoutes: true,
      subNavComponent: (
        <SubNav
          links={[
            {
              name: 'owned',
              path: 'gotchis/owned',
              isLoading: isInitialOwnedGotchisLoading,
              count: ownedGotchisCount
            },
            {
              name: 'lendings',
              path: 'gotchis/lended',
              isLoading: isInitialLentGotchisLoading,
              count: lentGotchisCount
            },
            {
              name: 'borrowed',
              path: 'gotchis/borrowed',
              isLoading: isInitialBorrowedGotchisLoading,
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
      isLoading: isInitialPortalsLoading,
      count: portalsCount
    },
    {
      name: 'warehouse',
      path: 'warehouse',
      icon: <WarehouseIcon width={24} height={24} />,
      isLoading: isInitialWarehouseLoading,
      count: warehouseCount
    },
    {
      name: 'installations',
      path: 'installations',
      icon: <AnvilIcon width={24} height={24} />,
      isLoading: isInitialInstallationsLoading || isInitialTilesLoading,
      count: installationsCount + tilesCount
    },
    {
      name: 'tickets',
      path: 'tickets',
      icon: <RareTicketIcon width={24} height={24} />,
      isLoading: isInitialTicketsLoading,
      count: ticketsCount
    },
    {
      name: 'realm',
      path: 'realm',
      icon: <KekIcon width={24} height={24} alt='realm' />,
      isLoading: isInitialRealmLoading,
      count: realmCount
    },
    {
      name: 'fake gotchis',
      path: 'fake-gotchis',
      icon: <FakeGotchisIcon width={24} height={24} />,
      isLoading: isInitialFakeGotchisLoading,
      count: fakeGotchisCount
    },
    {
      name: 'for sale',
      path: 'for-sale',
      icon: <BaazarIcon width={24} height={24} />,
      isLoading: isInitialItemsForSaleLoading,
      count: itemsForSaleCount
    }
  ];

  useEffect(() => {
    if (EthersApi.isEthAddress(account)) {
      dispatch(setActiveAddress(account));
    }

    dispatch(fromDataReloadStore.onSetReloadType(DataReloadType.Client));

    return () => {
      dispatch(fromDataReloadStore.onSetReloadType(null));
    };
  }, []);

  useEffect(() => {
    if (activeAddress) {
      if (activeAddress !== account && !isActiveAddressSet) {
        dispatch(setActiveAddress(account));
      } else {
        navigate({
          pathname: `/client/${activeAddress}${subroute ? `/${subroute}` : ''}`,
          search: queryString.stringify(queryParams, {
            sort: (a, b) => queryParamsOrder.indexOf(a) - queryParamsOrder.indexOf(b),
            arrayFormat: 'comma',
            encode: false
          })
        });

        dispatch(fromClientStore.onUpdateClientLoadingStates());
        dispatch(fromClientStore.onLoadClientData(activeAddress));
      }

      setIsActiveAddressSet(true);
    }
  }, [activeAddress]);

  useEffect(() => {
    if (isClientDataLoading) {
      if (!isReloadDisabled) {
        dispatch(fromDataReloadStore.setIsReloadDisabled(true));
      }
    } else {
      dispatch(fromDataReloadStore.setLastUpdatedTimestamp(Date.now()));
      dispatch(fromDataReloadStore.setIsReloadDisabled(false));
    }
  }, [isClientDataLoading]);

  useEffect(() => {
    if (activeAddress && lastManuallyTriggeredTimestamp !== 0 && !isClientDataLoading) {
      dispatch(fromClientStore.onLoadClientData(activeAddress));
    }
  }, [lastManuallyTriggeredTimestamp]);

  return (
    <>
      <Helmet>
        <title>
          {account ? `${CommonUtils.cutAddress(account, '..')} ${subroute ? subroute : 'client'}` : 'client'}
        </title>
      </Helmet>

      {EthersApi.isEthAddress(account) && (
        <div className={classes.routesNav}>
          <PageNav
            links={navData}
            // TODO should be shown in the future
            // beforeContent={(
            //     <Button
            //         to={account as string}
            //         className={classes.customBtn}
            //         component={NavLink}
            //     >
            //         <GameControllerIcon width={24} height={24} />
            //     </Button>
            // )}
            afterContent={
              <React.Fragment>
                {subroute.includes('realm') && <RealmSwitchButton view={realmView} navigate={navigate} />}
              </React.Fragment>
            }
          ></PageNav>
        </div>
      )}

      <Routes>
        <Route path='' element={<ClientAccount />} />
        <Route path='gotchis/*' element={<ClientGotchis />} />
        <Route path='portals' element={<ClientPortals />} />
        <Route path='installations' element={<ClientInstallations />} />
        <Route path='warehouse' element={<ClientWarehouse />} />
        <Route path='tickets' element={<ClientTickets />} />
        <Route path='realm/*' element={<ClientRealm />} />
        <Route path='fake-gotchis' element={<ClientFakeGotchis />} />
        <Route path='for-sale' element={<ClientForSale />} />
        <Route path='*' element={<Navigate to='gotchis' replace />} />
      </Routes>
    </>
  );
}
