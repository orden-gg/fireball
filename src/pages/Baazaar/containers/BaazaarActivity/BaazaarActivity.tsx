import { Navigate, Route, Routes } from 'react-router-dom';

import {
    BaazaarActivityConsumables,
    BaazaarActivityGotchis,
    BaazaarActivityParcels,
    BaazaarActivityPortals,
    BaazaarActivityInstallations,
    BaazaarActivityTiles,
    BaazaarActivityWearables
} from '../../components';

export function BaazaarActivity() {
    return (
        <Routes>
            <Route path='portals' element={<BaazaarActivityPortals />} />
            <Route path='gotchis' element={<BaazaarActivityGotchis />} />
            <Route path='parcels' element={<BaazaarActivityParcels />} />
            <Route path='wearables' element={<BaazaarActivityWearables />} />
            <Route path='installations' element={<BaazaarActivityInstallations />} />
            <Route path='tiles' element={<BaazaarActivityTiles />} />
            <Route path='consumables' element={<BaazaarActivityConsumables />} />
            <Route path='*' element={<Navigate to='portals' replace />} />
        </Routes>
    );
}
