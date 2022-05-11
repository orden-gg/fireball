import React, { useContext } from 'react';
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

    const { selectActiveAddress } = useContext(LoginContext);

    const onAddressSubmit = (address) => {
        selectActiveAddress(address);
        history.push({ pathname: `/client/${address}` });
    };

    return (
        <div className={classes.loginNav}>
            <LoginNavigation address={account} onSubmit={onAddressSubmit} />
        </div>
    );
}
