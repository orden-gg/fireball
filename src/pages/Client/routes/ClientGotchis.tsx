import { Navigate, Route, Routes } from 'react-router-dom';

import { ClientBorrowed } from './ClientBorrowed';
import { ClientLendings } from './ClientLendings';
import { ClientOwned } from './ClientOwned';

export function ClientGotchis() {
    return (
        <Routes>
            <Route path='owned' element={<ClientOwned />} />
            <Route path='lended' element={<ClientLendings />} />
            <Route path='borrowed' element={ <ClientBorrowed /> } />
            <Route path='*' element={<Navigate to='owned' replace />} />
        </Routes>
    );
}
