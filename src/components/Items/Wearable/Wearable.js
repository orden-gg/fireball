import React from 'react';
import { Box, Typography } from '@mui/material';
import classNames from 'classnames';
import useStyles from '../styles';

import itemUtils from '../../../utils/itemUtils';

export default function Wearable({wearable, raffleStats}) {
    const classes = useStyles();
    const name = itemUtils.getItemNameById(wearable.itemId);
    const rarity = itemUtils.getItemRarityById(wearable.itemId);
    const stats = itemUtils.getEmojiStatsById(wearable.itemId);

    return (
        <Box className={classNames(classes.item, rarity)}>
            <div className={classes.labels}>
                {wearable.balance ? (
                    <Typography className={classes.balance} variant='subtitle2'>
                        {wearable.balance}
                    </Typography>
                ) : (
                    null
                )}
            </div>

            <div className={classes.iconWrapper}>
                <img
                    src={itemUtils.getWearableImg(wearable.itemId)}
                    alt={name}
                    className={classes.icon}
                />
            </div>

            <div className={classes.nameWrapper}>
                <Typography className={classNames(classes.name, classes.textHighlight, rarity)}>
                    {name}
                </Typography>
            </div>

            <Typography variant='subtitle1'>
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
        </Box>
    )
}