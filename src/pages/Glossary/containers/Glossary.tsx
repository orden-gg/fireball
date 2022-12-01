import { Navigate, Route, Routes } from 'react-router-dom';

import { GlossaryRoot, GlossaryWearables } from '../components';

export function Glossary() {
    return (
        <>
            <Routes>
                <Route path='' element={<GlossaryRoot />} />
                <Route path='wearables' element={<GlossaryWearables />} />
                <Route path='*' element={<Navigate to='' replace />} />
            </Routes>
        </>
    );
}
