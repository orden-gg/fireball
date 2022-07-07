import { useLocation } from 'react-router-dom';

import { DataReloadType } from 'shared/constants';
import { DataReloadPanel } from './components/DataReloadPanel';
import { Logo } from './components/Logo';
import { UserPanel } from './components/UserPanel';

export function Header() {
    const { pathname } = useLocation();

    const subRoute = pathname.split('/')[1];
    const isShowDataReloadPanel: boolean = Object.values<string>(DataReloadType).includes(subRoute);

    return (
        <>
            <Logo />
            { isShowDataReloadPanel && <DataReloadPanel /> }
            <UserPanel />
        </>
    );
}
