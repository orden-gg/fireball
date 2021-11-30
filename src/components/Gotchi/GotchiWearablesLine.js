import React from 'react';
import { Tooltip, useTheme } from '@mui/material';

import itemUtils from '../../utils/itemUtils';
import { GotchiWareableLineStyles } from "./styles";

import Wearable from '../Items/Wearable/Wearable';
import classNames from 'classnames';

export default function GotchiWearablesLine({wearables}) {
    const classes = GotchiWareableLineStyles();
    const theme = useTheme();
    const wearableSlots = ['Body', 'Face', 'Eyes', 'Head', 'R Hand', 'L Hand', 'Pet'];

    return (
        <div className={classes.gotchiWLineWrapper}>
            {
                wearableSlots.map((name, index)=> {
                    let wearable = wearables[index];
                    let rarityColor = itemUtils.getItemRarityById(wearable);

                    return (
                        <Tooltip
                            title={
                                wearable !== 0 ? (
                                    <div className={classNames(classes.gotchiWTooltipTitle, 'tooltip-wearable')}>
                                        <Wearable wearable={{ id: wearable }} tooltip={true} />
                                    </div>
                                ) : (
                                    <span>
                                        <span className={classes.gotchiWTooltipName}>{name}</span>
                                        Empty
                                    </span>
                                )
                            }
                            classes={{ tooltip: classes.customTooltip }}
                            enterTouchDelay={0}
                            placement='top'
                            key={index}
                        >
                            <div
                                className={classes.gotchiWLineItem}
                                style={{ backgroundColor: theme.palette.rarity[rarityColor] }}
                                key={index}
                            ></div>
                        </Tooltip>
                    )
                })
            }
        </div>
    );
}