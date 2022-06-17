import { useParams } from 'react-router';

import { EthAddressPanel } from 'components/EthAddressPanel/EthAddressPanel';
import ethersApi from 'api/ethers.api';

import { ClientNav } from '../components/ClientNav';
import { styles, accountStyles } from '../styles';

export function ClientAccount() {
    const classes = { ...styles(), ...accountStyles() };

    const { account } = useParams<{ account: string }>();

    return (
        <div className={classes.accountContainer}>
            <ClientNav />

            { ethersApi.isEthAddress(account) && (
                <div className={classes.accountPanel}>
                    <EthAddressPanel address={account} />
                </div>
            )}
        </div>
    );
}