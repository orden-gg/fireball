import classNames from 'classnames';

import { CustomTooltip } from 'components/custom/CustomTooltip';
import { GraphUtils } from 'utils';

import { styles } from './styles';

export function GotchiCollateral({ gotchi, className }: { gotchi: any, className?: string }) {
    const classes = styles();

    const collateral: string = GraphUtils.getCollateralName(gotchi.collateral);

    return (
        <CustomTooltip
            title={collateral}
            enterTouchDelay={0}
            placement='top'
            followCursor
        >
            <div className={classNames(classes.gotchiCollateral, className)}>
                <img
                    src={GraphUtils.getCollateralImg(collateral)}
                    width={25}
                    alt={collateral}
                />
            </div>
        </CustomTooltip>
    );
}
