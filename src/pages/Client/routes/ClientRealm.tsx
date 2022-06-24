import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ClientContext } from 'contexts/ClientContext';

import { ClientRealmList } from './ClientRealmList';
import { ClientRealmMap } from './ClientRealmMap';

export function ClientRealm() {
    const { realmView } = useContext<any>(ClientContext);

    return (
        <>
            <Routes>
                <Route path='list' element={<ClientRealmList />} />
                <Route path='map' element={<ClientRealmMap />} />
                <Route path='*' element={<Navigate to={`${realmView}`} replace />} />
            </Routes>
        </>
    );
}
