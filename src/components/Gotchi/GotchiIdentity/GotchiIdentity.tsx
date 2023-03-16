import { Identity } from 'shared/models';

import { CustomTooltip } from 'components/custom/CustomTooltip';

import { styles } from './styles';

interface GotchiLevelProps {
  identity: Identity;
}

export function GotchiIdentity({ identity }: GotchiLevelProps) {
  const classes = styles();

  return (
    <CustomTooltip title={<p>identity</p>} enterTouchDelay={0} placement='top' followCursor>
      <div className={classes.gotchiIdentity}>1/{identity.claimed.length}</div>
    </CustomTooltip>
  );
}
