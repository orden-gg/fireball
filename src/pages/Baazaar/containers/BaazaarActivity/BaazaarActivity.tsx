import { Navigate, Route, Routes } from 'react-router-dom';

import {
  BaazaarActivityConsumables,
  BaazaarActivityGotchis,
  BaazaarActivityInstallations,
  BaazaarActivityParcels,
  BaazaarActivityPortals,
  BaazaarActivityTiles,
  BaazaarActivityWearables
} from '../../components';

export function BaazaarActivity() {
  return (
    <Routes>
      <Route path='gotchis' element={<BaazaarActivityGotchis />} />
      <Route path='portals' element={<BaazaarActivityPortals />} />
      <Route path='parcels' element={<BaazaarActivityParcels />} />
      <Route path='wearables' element={<BaazaarActivityWearables />} />
      <Route path='installations' element={<BaazaarActivityInstallations />} />
      <Route path='tiles' element={<BaazaarActivityTiles />} />
      <Route path='consumables' element={<BaazaarActivityConsumables />} />
      <Route path='*' element={<Navigate to='gotchis' replace />} />
    </Routes>
  );
}
