import { Navigate, Route, Routes } from 'react-router-dom';

import { BaazaarActivityGotchis, BaazaarActivityPortals } from '../../components';

export function BaazaarActivity() {
    return (
        <Routes>
            <Route path='portals' element={<BaazaarActivityPortals />} />
            <Route path='gotchis' element={<BaazaarActivityGotchis />} />
            <Route path='parcels' element={<div>Activity parcels</div>} />
            <Route path='*' element={<Navigate to='portals' replace />} />
        </Routes>
    );
}
