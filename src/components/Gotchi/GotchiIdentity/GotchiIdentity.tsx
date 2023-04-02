import { CustomTooltip } from 'components/custom/CustomTooltip';

import { styles } from './styles';

interface GotchiLevelProps {
  identityQuantity: number;
}

export function GotchiIdentity({ identityQuantity }: GotchiLevelProps) {
  const classes = styles();

  return (
    <CustomTooltip title={<p>identity</p>} enterTouchDelay={0} placement='top' followCursor>
      <div className={classes.gotchiIdentity}>1/{identityQuantity}</div>
    </CustomTooltip>
  );
}
