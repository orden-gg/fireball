import { useCallback, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { LoginNavigation } from 'components/Login/LoginNavigation';
import { LoginContext } from 'contexts/LoginContext';

import { accountStyles, styles } from '../styles';

export function ClientNav() {
    const classes = { ...styles(), ...accountStyles() };

    const navigate = useNavigate();
    const { account } = useParams<{ account: string }>();

    const { setActiveAddress } = useContext<any>(LoginContext);

    const onAddressSubmit = useCallback((address: string) => {
        navigate({ pathname: `/client/${address}` });
        setActiveAddress(address);
    }, [navigate, setActiveAddress]);

    return (
        <div className={classes.loginNav}>
            <LoginNavigation address={account} onSubmit={onAddressSubmit} />
        </div>
    );
}
