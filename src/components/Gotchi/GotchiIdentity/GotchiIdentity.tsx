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
    <CustomTooltip
      arrow
      title={
        <div>
          <span className={classes.tooltipText}>
            Look corresponds to the number of gotchis that have the same combination of eye color, eye shape, and race
            (collateral).
          </span>
          <span className={classes.tooltipText}>The higher the look, the less rare the gotchi is.</span>
        </div>
      }
      enterTouchDelay={0}
      placement='top'
    >
      <div className={classNames(classes.gotchiIdentity, GotchiUtils.getIdentityRarity(identityQuantity))}>
        look <span>{identityQuantity ? identityQuantity : '*'}</span>
      </div>
    </CustomTooltip>
  );
}
