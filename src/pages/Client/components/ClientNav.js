import React from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';

import LoginNavigation from 'components/Login/LoginNavigation';

import styles, { accountStyles } from '../styles';

export default function ClientNav() {
    const classes = {
        ...styles(),
        ...accountStyles()
    };

    const history = useHistory();
    const { account } = useParams();

    const onAddressSubmit = (address) => {
        history.push({ pathname: `/client/${address}` });
    };

    return (
        <div className={classes.loginNav}>
            <LoginNavigation address={account} onSubmit={onAddressSubmit} />
        </div>
    );
}
