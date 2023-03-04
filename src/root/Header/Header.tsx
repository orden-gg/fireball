import { useLocation } from 'react-router-dom';

import { DataReloadType } from 'shared/constants';

import { DataReloadPanel } from './components/DataReloadPanel';
import { Logo } from './components/Logo';
import { UserPanel } from './components/UserPanel';
import { styles } from './styles';

export function Header() {
  const classes = styles();

  const { pathname } = useLocation();

  const subRoute = pathname.split('/')[1];
  const isShowDataReloadPanel: boolean = Object.values<string>(DataReloadType).includes(subRoute);

  return (
    <>
      <div className={classes.leftSide}>
        <Logo />
        {isShowDataReloadPanel && <DataReloadPanel />}
      </div>
      <UserPanel />
    </>
  );
}
