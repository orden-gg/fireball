import { useAppSelector } from 'core/store/hooks';
import { PageNavLink } from 'shared/models';
import { PageNav } from 'components/PageNav/PageNav';
import { WarehouseIcon } from 'components/Icons/Icons';

import { getGlossaryWearablesCount } from '../../store';

export function GlossaryRoot() {
    const wearablesCount = useAppSelector(getGlossaryWearablesCount);

    const navData: PageNavLink[] = [
        {
            name: 'wearables',
            path: 'wearables',
            icon: <WarehouseIcon width={24} height={24} />,
            isLoading: false,
            count: wearablesCount
        }
    ];

    return (
        <PageNav links={navData}></PageNav>
    );
}
