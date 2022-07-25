import { Navigate, Route, Routes } from 'react-router-dom';

import { ClientRealmList } from './ClientRealmList';
import { ClientRealmMap } from './ClientRealmMap';

export function ClientRealm() {
    return (
        <>
            <Routes>
                <Route path='list' element={<ClientRealmList />} />
                <Route path='map' element={<ClientRealmMap />} />
                <Route path='*' element={<Navigate to='list' replace />} />
            </Routes>
        </>
    );
}
