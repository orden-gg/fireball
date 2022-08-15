import { Navigate, Route, Routes } from 'react-router-dom';

import { GlossaryHome, GlossaryWearables } from '../components';

export function Glossary() {

    return (
        <>
            <Routes>
                <Route path='' element={<GlossaryHome />} />
                <Route path='wearables' element={<GlossaryWearables />} />
                <Route path='*' element={<Navigate to='' replace />} />
            </Routes>
        </>
    );
}
