import { GotchiHeartGif } from 'components/Icons/Icons';
import { CustomTooltip } from 'components/custom/CustomTooltip';

import { GotchiverseUtils } from 'utils';

import { GotchiKinshipTooltip } from './GotchiKinshitTooltip';
import { styles } from './styles';

// TODO pass only kinship
export function GotchiKinship({ gotchi }: { gotchi: CustomAny }) {
  const classes = styles();

  return (
    <CustomTooltip title={<GotchiKinshipTooltip kinship={gotchi.kinship} />} placement='bottom' arrow={true}>
      <div className={classes.gotchiKinship}>
        <span>
          <GotchiHeartGif width={12} height={12} className={classes.gotchiKinshipIcon} />x
          {GotchiverseUtils.countKinshipChannelingBoost(gotchi.kinship)}
        </span>
      </div>
    </CustomTooltip>
  );
}
