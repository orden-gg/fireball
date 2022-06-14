import { useContext } from 'react';

import Balances from 'root/Header/components/Balances';
import LoginButton from 'components/Login/LoginButton';
import { LoginContext } from 'contexts/LoginContext';

import styles from '../styles';

export default function UserPanel() {
    const { activeAddress } = useContext(LoginContext);
    const classes = styles();

    return (
        <div className={classes.userPanel}>
            { activeAddress && <Balances /> }
            <LoginButton />
        </div>
    );
}
