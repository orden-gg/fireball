import { Link } from '@mui/material';

import { EthEnsAddress } from 'components/EthAddress/EthEnsAddress';

import { styles } from './styles';

export function GotchiOwner({ gotchi }: { gotchi: CustomAny }) {
  const classes = styles();

  return (
    <Link className={classes.owner} href={`/client/?address=${gotchi.owner.id}`} target='_blank'>
      <EthEnsAddress address={gotchi.owner.id} />
    </Link>
  );
}
