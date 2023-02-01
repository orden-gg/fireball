import classNames from 'classnames';

import { CustomTooltip } from 'components/custom/CustomTooltip';
import { GraphUtils } from 'utils';

import { styles } from './styles';

export function GotchiCollateral({ collateral, className }: { collateral: string; className?: string }) {
  const classes = styles();

  const collateralName: string = GraphUtils.getCollateralName(collateral);

  return (
    <CustomTooltip title={collateralName} enterTouchDelay={0} placement='top' followCursor>
      <div className={classNames(classes.gotchiCollateral, className)}>
        <img src={GraphUtils.getCollateralImg(collateralName)} width={25} alt={collateralName} />
      </div>
    </CustomTooltip>
  );
}
