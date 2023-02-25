import { Identity } from 'shared/models';
import { CustomTooltip } from 'components/custom/CustomTooltip';
import { IdentityTooltip } from './components/IdentityTooltip';
import { IdentityList } from './components/IdentityList';
import { GotchiInfoItem } from '../GotchiInfoList/components/GotchiInfoItem/GotchiInfoItem';

import { gotchiIdentityStyles } from './styles';

interface GotchiIdentityProps {
  identity: Identity;
}

export function GotchiIdentity({ identity }: GotchiIdentityProps) {
  const classes = gotchiIdentityStyles();

  return (
    <div className={classes.identityWrapper}>
      <h3 className={classes.identityTitle}>Identity</h3>

      <div className={classes.identityGroup}>
        <CustomTooltip
          className={classes.tooltip}
          title={
            <IdentityTooltip>
              <IdentityList identity={identity.claimed} />
            </IdentityTooltip>
          }
          placement='bottom'
          arrow
        >
          <div className={classes.identityGroupItem}>
            <GotchiInfoItem className={classes.identityGroupBadge} label='summoned' value={identity.claimed.length} />
          </div>
        </CustomTooltip>
        {identity.unclaimed.length > 0 ? (
          <CustomTooltip
            className={classes.tooltip}
            title={
              <IdentityTooltip>
                <IdentityList identity={identity.unclaimed} />
              </IdentityTooltip>
            }
            placement='bottom'
            arrow
          >
            <div className={classes.identityGroupItem}>
              <GotchiInfoItem
                className={classes.identityGroupBadge}
                label='in portal'
                value={identity.unclaimed.length}
              />
            </div>
          </CustomTooltip>
        ) : (
          <div className={classes.identityGroupItem}>
            <GotchiInfoItem
              className={classes.identityGroupBadge}
              label='in portal'
              value={identity.unclaimed.length}
            />
          </div>
        )}
      </div>
    </div>
  );
}
