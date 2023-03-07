import { useParams } from 'react-router-dom';

import { EthersApi } from 'api';

import { EthAddressPanel } from 'components/EthAddressPanel/EthAddressPanel';

import { ClientNav } from '../components/ClientNav';
import { accountStyles, styles } from '../styles';

export function ClientAccount() {
  const classes = { ...styles(), ...accountStyles() };

  const { account } = useParams<{ account: string }>();

  return (
    <div className={classes.accountContainer}>
      <ClientNav />

      {EthersApi.isEthAddress(account) && (
        <div className={classes.accountPanel}>
          <EthAddressPanel address={account as string} />
        </div>
      )}
    </div>
  );
}
