import { Tooltip, useTheme } from '@mui/material';
import classNames from 'classnames';

import Wearable from 'components/Items/Wearable/Wearable';
import itemUtils from 'utils/itemUtils';

import { CustomTooltipStyles } from '../styles';
import styles from './styles';

export default function GotchiWearablesLine({ gotchi }) {
    const classes = {
        ...styles(),
        ...CustomTooltipStyles()
    };
    const theme = useTheme();
    const wearableSlots = ['Body', 'Face', 'Eyes', 'Head', 'R Hand', 'L Hand', 'Pet'];
    const wearables = gotchi.equippedWearables;

    return (
        <div className={classes.gotchiWLineWrapper}>
            {
                gotchi.equippedSetName ? (
                    <div className={classes.gotchiSetName}>
                        {gotchi.equippedSetName}
                    </div>
                ) : null
            }
            {
                wearableSlots.map((name, index) => {
                    const wearable = wearables[index];
                    const rarityColor = itemUtils.getItemRarityById(wearable);

                    return (
                        <Tooltip
                            title={
                                wearable !== 0 ? (
                                    <div className={classNames(classes.gotchiWTooltipTitle, 'tooltip-wearable')}>
                                        <Wearable wearable={{ id: wearable, category: 0 }} tooltip={true} />
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
                    );
                })
            }
        </div>
    );
}
