import { ConsumableIcon, GotchiIcon, H1SealedPortalIcon, KekIcon, WarehouseIcon } from 'components/Icons/Icons';
import { PageNav } from 'components/PageNav/PageNav';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PageNavLink } from 'shared/models';

import { BaazaarClosedPortals, BaazaarConsumables, BaazaarGotchis, BaazaarParcels, BaazaarWearables } from '../components';

export function Baazaar() {
    const navData: PageNavLink[] = [
        {
            path: 'gotchis',
            icon: <GotchiIcon width={24} height={24} />
        },
        {
            path: 'parcels',
            icon: <KekIcon width={24} height={24} alt='realm' />
        },
        {
            path: 'portals',
            icon: <H1SealedPortalIcon width={24} height={24} />
        },
        {
            path: 'wearables',
            icon: <WarehouseIcon width={24} height={24} />
        },
        {
            path: 'consumables',
            icon: <ConsumableIcon width={24} height={24} />
        }
    ];

    return <>
        <PageNav links={navData}></PageNav>

        <Routes>
            <Route path='gotchis' element={<BaazaarGotchis />} />
            <Route path='parcels' element={<BaazaarParcels />} />
            <Route path='portals' element={<BaazaarClosedPortals />} />
            <Route path='wearables' element={<BaazaarWearables />} />
            <Route path='consumables' element={<BaazaarConsumables />} />
            <Route path='*' element={<Navigate to='gotchis' replace />} />
        </Routes>
    </>;
}
