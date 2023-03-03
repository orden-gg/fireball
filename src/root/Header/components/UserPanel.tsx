import { useAppSelector } from 'core/store/hooks';
import { getActiveAddress } from 'core/store/login';

import { Balances } from 'root/Header/components/Balances';

import { LoginButton } from 'components/Login/LoginButton';

import { styles } from '../styles';

export function UserPanel() {
  const classes = styles();

  const activeAddress = useAppSelector(getActiveAddress);

  return (
    <div className={classes.userPanel}>
      {activeAddress && <Balances />}
      <LoginButton />
    </div>
  );
}
