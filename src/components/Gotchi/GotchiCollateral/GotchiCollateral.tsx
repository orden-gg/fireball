import { Tooltip } from '@mui/material';

import { GraphUtils } from 'utils';

import { CustomTooltipStyles } from '../styles';

import { styles } from './styles';

export function GotchiCollateral({ gotchi }: { gotchi: any }) {
    const classes = { ...CustomTooltipStyles(), ...styles() };

    const collateral: string = GraphUtils.getCollateralName(gotchi.collateral);

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
                    src={GraphUtils.getCollateralImg(collateral)}
                    width={25}
                    alt={collateral}
                />
            </div>
        </Tooltip>
    );
}
