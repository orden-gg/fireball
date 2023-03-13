import { Link } from '@mui/material';

import { CommonUtils } from 'utils';

import { styles } from './styles';

export function GotchiOwner({ gotchi }: { gotchi: CustomAny }) {
  const classes = styles();

  return (
    <Link className={classes.owner} href={`/client/?address=${gotchi.owner.id}`} target='_blank'>
      <p>{CommonUtils.cutAddress(gotchi.owner.id)}</p>
    </Link>
  );
}
