import classNames from 'classnames';

import { Gotchi } from 'shared/models';

import { CustomTooltip } from 'components/custom/CustomTooltip';

import { GotchiInfoItem } from '../GotchiInfoList/components/GotchiInfoItem/GotchiInfoItem';
import { IdentityList } from './components/identityList/IdentityList';
import { gotchiIdentityStyles } from './styles';

interface GotchiPreviewIdentityProps {
  gotchisLoaded: boolean;
  claimedGotchis: Gotchi[];
  unclaimedGotchiIds: number[];
  className?: string;
}

export function GotchiPreviewIdentity({
  gotchisLoaded,
  claimedGotchis,
  unclaimedGotchiIds,
  className
}: GotchiPreviewIdentityProps) {
  const classes = gotchiIdentityStyles();

  return (
    <CustomTooltip
      disableInteractive
      arrow
      placement='top'
      title={
        <div>
          <span className={classes.identityTooltipText}>
            Look corresponds to the number of gotchis that have the same combination of eye color, eye shape, and race
            (collateral).
          </span>
          <span className={classes.identityTooltipText}>The higher the look, the less rare the gotchi is.</span>
        </div>
      }
    >
      <div className={classNames(classes.identityWrapper, className)}>
        <h3 className={classes.identityTitle}>look</h3>

        <div className={classes.identityGroup}>
          <CustomTooltip
            className={classes.tooltip}
            title={<IdentityList gotchis={claimedGotchis} />}
            placement='bottom'
            arrow
          >
            <div className={classes.identityGroupItem}>
              <GotchiInfoItem
                className={classes.identityGroupBadge}
                label='summoned'
                value={claimedGotchis.length}
                isLoaded={gotchisLoaded}
              />
            </div>
          </CustomTooltip>
          {unclaimedGotchiIds.length > 0 ? (
            <CustomTooltip
              className={classes.tooltip}
              title={<IdentityList gotchis={unclaimedGotchiIds} />}
              placement='bottom'
              arrow
            >
              <div className={classes.identityGroupItem}>
                <GotchiInfoItem
                  className={classes.identityGroupBadge}
                  label='in portal'
                  value={unclaimedGotchiIds.length}
                  isLoaded={gotchisLoaded}
                />
              </div>
            </CustomTooltip>
          ) : (
            <div className={classes.identityGroupItem}>
              <GotchiInfoItem
                className={classes.identityGroupBadge}
                label='in portal'
                value={unclaimedGotchiIds.length}
              />
            </div>
          )}
        </div>
      </div>
    </CustomTooltip>
  );
}
