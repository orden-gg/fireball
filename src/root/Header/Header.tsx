import { useLocation } from 'react-router-dom';

import { DataReloadType } from 'shared/constants';
import { DataReloadButton } from './components/DataReloadButton';
import { Logo } from './components/Logo';
import { UserPanel } from './components/UserPanel';

export function Header() {
    const { pathname } = useLocation();

    const subRoute = pathname.split('/')[1];
    const isShowDataReloadBtn: boolean = Object.values<string>(DataReloadType).includes(subRoute);

    return (
        <>
            <Logo />
            { isShowDataReloadBtn && <DataReloadButton /> }
            <UserPanel />
        </>
    );
}
