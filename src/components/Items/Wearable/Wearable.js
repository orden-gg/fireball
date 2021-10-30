import React from 'react';
import { Box, Typography } from '@mui/material';
import classNames from 'classnames';
import useStyles from '../styles';

import itemUtils from '../../../utils/itemUtils';
import ERC1155 from '../ERC1155/ERC1155';

export default function Wearable({wearable, raffleStats, tooltip}) {
    const classes = useStyles();

    const name = itemUtils.getItemNameById(wearable.id);
    const rarity = itemUtils.getItemRarityById(wearable.id);
    const stats = itemUtils.getEmojiStatsById(wearable.id);
    const slot = itemUtils.getItemSlotById(wearable.id);

    return (
        <ERC1155 item={{
            id: wearable.id,
            rarity: rarity,
            category: 0,
            balance: wearable.balance,
            holders: wearable.holders,
            slot: slot,
            tooltip: tooltip
        }}>

            <div className={classes.iconWrapper}>
                <img
                    src={itemUtils.getWearableImg(wearable.id)}
                    alt={name}
                    className={classes.icon}
                />
            </div>

            <div className={classes.nameWrapper}>
                <Typography className={classNames(classes.name, classes.textHighlight, rarity)}>
                    {name}
                </Typography>
            </div>

            <Typography variant='subtitle1' className={classes.stats}>
                {stats}
            </Typography>

            {raffleStats ? (
                <Box>
                    <Typography variant='body2'>Quantity:
                        <Box component='span' marginLeft='8px' className={classNames(classes.textHighlight, rarity)}>{raffleStats.amount}</Box>
                    </Typography>
                    <Typography
                        variant={'subtitle1'}
                        className={classNames(classes.textHighlight, rarity)}
                    >
                        {raffleStats.chance}
                    </Typography>
                </Box>
            ) : (
                null
            )}
        </ERC1155>
    )
}