import classNames from 'classnames';

import { CustomTooltip } from 'components/custom/CustomTooltip';

import { GotchiUtils } from 'utils';

import { styles } from './styles';

interface GotchiLevelProps {
  identityQuantity: number;
}

export function GotchiIdentity({ identityQuantity }: GotchiLevelProps) {
  const classes = styles();

  return (
    <CustomTooltip title={<p>identity</p>} enterTouchDelay={0} placement='top' followCursor>
      <div className={classNames(classes.gotchiIdentity, GotchiUtils.getIdentityRarity(identityQuantity))}>
        1/{identityQuantity}
      </div>
    </CustomTooltip>
  );
}
