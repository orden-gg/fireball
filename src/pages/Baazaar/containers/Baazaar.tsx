import { ConsumableIcon, GotchiIcon, H1SealedPortalIcon, WarehouseIcon } from 'components/Icons/Icons';
import { PageNav } from 'components/PageNav/PageNav';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PageNavLink } from 'shared/models';

import { BaazaarClosedPortals, BaazaarConsumables, BaazaarGotchis, BaazaarWearables } from '../components';

export function Baazaar() {
    const navData: PageNavLink[] = [
        {
            path: 'gotchis',
            icon: <GotchiIcon width={24} height={24} />
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
            <Route path='portals' element={<BaazaarClosedPortals />} />
            <Route path='wearables' element={<BaazaarWearables />} />
            <Route path='consumables' element={<BaazaarConsumables />} />
            <Route path='*' element={<Navigate to='gotchis' replace />} />
        </Routes>
    </>;
}
