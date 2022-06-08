import { useCallback, useContext } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';

import LoginNavigation from 'components/Login/LoginNavigation';
import { LoginContext } from 'contexts/LoginContext';

import styles, { accountStyles } from '../styles';

export default function ClientNav() {
    const classes = {
        ...styles(),
        ...accountStyles()
    };

    const history = useHistory();
    const { account } = useParams();

    const { setActiveAddress } = useContext(LoginContext);

    const onAddressSubmit = useCallback((address) => {
        history.push({ pathname: `/client/${address}` });
        setActiveAddress(address);
    }, [history, setActiveAddress]);

    return (
        <div className={classes.loginNav}>
            <LoginNavigation address={account} onSubmit={onAddressSubmit} />
        </div>
    );
}
