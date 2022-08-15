import { Navigate, Route, Routes } from 'react-router-dom';

import { useAppSelector } from 'core/store/hooks';
import { PageNavLink } from 'shared/models';
import { PageNav } from 'components/PageNav/PageNav';
import { ConsumableIcon, WarehouseIcon } from 'components/Icons/Icons';

import { GlossaryConsumables } from '../components/GlossaryConsumables/GlossaryConsumables';
import { GlossaryWearables } from '../components/GlossaryWearables/GlossaryWearables';

import { getGlossaryWearablesCount } from '../store';

export function Glossary() {
    const wearablesCount = useAppSelector(getGlossaryWearablesCount);

    const navData: PageNavLink[] = [
        {
            name: 'wearables',
            path: 'wearables',
            icon: <WarehouseIcon width={24} height={24} />,
            isLoading: false,
            count: wearablesCount
        },
        {
            name: 'consumables',
            path: 'consumables',
            icon: <ConsumableIcon width={24} height={24} />,
            isLoading: false,
            count: 101
        }
    ];

    return (
        <>
            <PageNav links={navData}></PageNav>

            <Routes>
                <Route path='wearables' element={<GlossaryWearables />} />
                <Route path='consumables' element={<GlossaryConsumables />} />
                <Route path='*' element={<Navigate to='wearables' replace />} />
            </Routes>
        </>
    );
}
