import { Tooltip } from '@mui/material';

import graphUtils from 'utils/graphUtils';

import { CustomTooltipStyles } from '../styles';

import { styles } from './styles';

export function GotchiCollateral({ gotchi }: { gotchi: any }) {
    const classes = { ...CustomTooltipStyles(), ...styles() };

    const collateral: string = graphUtils.getCollateralName(gotchi.collateral);

    return (
        <Tooltip
            title={collateral}
            classes={{ tooltip: classes.customTooltip }}
            enterTouchDelay={0}
            placement='top'
            followCursor
        >
            <div className={classes.gotchiCollateral}>
                <img
                    src={graphUtils.getCollateralImg(collateral)}
                    width={25}
                    alt={collateral}
                />
            </div>
        </Tooltip>
    );
}
