import { Navigate, Route, Routes } from 'react-router-dom';

import { PageNavLink } from 'shared/models';

import {
  ActivityIcon,
  AnvilIcon,
  ConsumableIcon,
  GotchiIcon,
  H1OpenedPortalIcon,
  H1SealedPortalIcon,
  KekIcon,
  PurpleGrassIcon,
  WarehouseIcon
} from 'components/Icons/Icons';
import { PageNav } from 'components/PageNav/PageNav';
import { SubNav } from 'components/PageNav/SubNav';

import {
  BaazaarClosedPortals,
  BaazaarConsumables,
  BaazaarGotchis,
  BaazaarInstallations,
  BaazaarOpenedPortals,
  BaazaarParcels,
  BaazaarTiles,
  BaazaarWearables
} from '../../components';
import { BaazaarActivity } from '../BaazaarActivity/BaazaarActivity';
import { styles } from './styles';

export function Baazaar() {
  const classes = styles();

  const navData: PageNavLink[] = [
    {
      path: 'gotchis',
      icon: <GotchiIcon width={24} height={24} />
    },
    {
      path: 'opened-portals',
      icon: <H1OpenedPortalIcon width={24} height={24} />
    },
    {
      path: 'portals',
      icon: <H1SealedPortalIcon width={24} height={24} />
    },
    {
      path: 'parcels',
      icon: <KekIcon width={24} height={24} alt='realm' />
    },
    {
      path: 'wearables',
      icon: <WarehouseIcon width={24} height={24} />
    },
    {
      path: 'installations',
      icon: <AnvilIcon width={24} height={24} />
    },
    {
      path: 'tiles',
      icon: <PurpleGrassIcon width={24} height={24} />
    },
    {
      path: 'consumables',
      icon: <ConsumableIcon width={24} height={24} />
    },
    {
      path: 'activity',
      icon: <ActivityIcon width={24} height={24} />,
      isShowSubRoutes: true,
      subNavComponent: (
        <SubNav
          links={[
            {
              path: 'activity/gotchis',
              icon: <GotchiIcon width={24} height={24} />
            },
            {
              path: 'activity/portals',
              icon: <H1SealedPortalIcon width={24} height={24} />
            },
            {
              path: 'activity/parcels',
              icon: <KekIcon width={24} height={24} />
            },
            {
              path: 'activity/wearables',
              icon: <WarehouseIcon width={24} height={24} />
            },
            {
              path: 'activity/installations',
              icon: <AnvilIcon width={24} height={24} />
            },
            {
              path: 'activity/tiles',
              icon: <PurpleGrassIcon width={24} height={24} />
            },
            {
              path: 'activity/consumables',
              icon: <ConsumableIcon width={24} height={24} />
            }
          ]}
        />
      )
    }
  ];

  return (
    <div className={classes.container}>
      <div className={classes.containerNav}>
        <PageNav links={navData}></PageNav>
      </div>

      <Routes>
        <Route path='gotchis' element={<BaazaarGotchis />} />
        <Route path='parcels' element={<BaazaarParcels />} />
        <Route path='portals' element={<BaazaarClosedPortals />} />
        <Route path='opened-portals' element={<BaazaarOpenedPortals />} />
        <Route path='wearables' element={<BaazaarWearables />} />
        <Route path='installations' element={<BaazaarInstallations />} />
        <Route path='tiles' element={<BaazaarTiles />} />
        <Route path='consumables' element={<BaazaarConsumables />} />
        <Route path='activity/*' element={<BaazaarActivity />} />
        <Route path='*' element={<Navigate to='gotchis' replace />} />
      </Routes>
    </div>
  );
}
