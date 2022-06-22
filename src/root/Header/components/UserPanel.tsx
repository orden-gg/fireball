import { useContext } from 'react';

import { Balances } from 'root/Header/components/Balances';
import { LoginButton } from 'components/Login/LoginButton';
import { LoginContext } from 'contexts/LoginContext';

import { styles } from '../styles';

export function UserPanel() {
    const classes = styles();

    const { activeAddress } = useContext<any>(LoginContext);

    return (
        <div className={classes.userPanel}>
            { activeAddress && <Balances /> }
            <LoginButton />
        </div>
    );
}
