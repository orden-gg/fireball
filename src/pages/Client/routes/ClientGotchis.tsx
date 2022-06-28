import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ClientContext } from 'contexts/ClientContext';

import { ClientBorrowed } from './ClientBorrowed';
import { ClientLendings } from './ClientLendings';
import { ClientOwned } from './ClientOwned';

export function ClientGotchis() {
    const { gotchiView } = useContext<any>(ClientContext);

    return (
        <Routes>
            <Route path='owned' element={<ClientOwned />} />
            <Route path='lended' element={<ClientLendings />} />
            <Route path='borrowed' element={ <ClientBorrowed /> } />
            <Route path='*' element={<Navigate to={gotchiView} replace />} />
        </Routes>
    );
}
