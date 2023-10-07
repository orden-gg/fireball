import { useEffect, useState } from 'react';

import { EthersApi } from 'api';

import { CommonUtils } from 'utils';

import { styles } from './styles';

export function EthEnsAddress({ address }: { address: string }) {
  const classes = styles();

  const [ens, setEns] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    EthersApi.getENS(address)
      .then((ensAddress: string | null) => {
        if (mounted && ensAddress) {
          setEns(ensAddress);
        }
      })
      .catch((err) => console.log(err));

    return () => {
      mounted = false;
      setEns(null);
    };
  }, [address]);

  return (
    <div className={classes.container}>
      {ens ? <span>{ens}</span> : <span>{CommonUtils.cutAddress(address, '..')}</span>}
    </div>
  );
}
