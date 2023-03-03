import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch } from 'core/store/hooks';
import { setActiveAddress } from 'core/store/login';

import { LoginNavigation } from 'components/Login/LoginNavigation';

import { accountStyles, styles } from '../styles';

export function ClientNav() {
  const classes = { ...styles(), ...accountStyles() };

  const navigate = useNavigate();
  const { account } = useParams<{ account: string }>();

  const dispatch = useAppDispatch();

  const onAddressSubmit = useCallback(
    (address: string) => {
      navigate({ pathname: `/client/${address}/gotchis` });
      dispatch(setActiveAddress(address));
    },
    [navigate]
  );

  return (
    <div className={classes.loginNav}>
      <LoginNavigation address={account} onSubmit={onAddressSubmit} />
    </div>
  );
}
