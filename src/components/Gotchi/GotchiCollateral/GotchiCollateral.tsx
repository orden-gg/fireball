import { CustomTooltip } from 'components/custom/CustomTooltip';
import { GraphUtils } from 'utils';

import { styles } from './styles';

export function GotchiCollateral({ gotchi }: { gotchi: any }) {
    const classes = styles();

    const collateral: string = GraphUtils.getCollateralName(gotchi.collateral);

    return (
        <CustomTooltip
            title={collateral}
            enterTouchDelay={0}
            placement='top'
            followCursor
        >
            <div className={classes.gotchiCollateral}>
                <img
                    src={GraphUtils.getCollateralImg(collateral)}
                    width={25}
                    alt={collateral}
                />
            </div>
        </CustomTooltip>
    );
}
