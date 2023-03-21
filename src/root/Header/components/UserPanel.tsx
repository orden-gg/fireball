import { useAppSelector } from 'core/store/hooks';
import * as fromLoginStore from 'core/store/login';

import { Balances } from 'root/Header/components/Balances';

import { LoginButton } from 'components/Login/LoginButton';

import { styles } from '../styles';

export function UserPanel() {
  const classes = styles();

  const activeAddress = useAppSelector(fromLoginStore.getActiveAddress);

  return (
    <div className={classes.userPanel}>
      {activeAddress && <Balances />}
      <LoginButton />
    </div>
  );
}
