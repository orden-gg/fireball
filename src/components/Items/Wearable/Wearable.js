import React from 'react';
import { Box, Typography } from '@mui/material';
import classNames from 'classnames';

import { ERC1155InnerStyles } from '../styles';

import itemUtils from '../../../utils/itemUtils';
import ERC1155 from '../ERC1155/ERC1155';

export default function Wearable({wearable, raffleStats, tooltip}) {
    const classes = ERC1155InnerStyles();

    const name = itemUtils.getItemNameById(wearable.id || wearable.erc1155TypeId);
    const rarity = itemUtils.getItemRarityById(wearable.id || wearable.erc1155TypeId);
    const stats = itemUtils.getEmojiStatsById(wearable.id || wearable.erc1155TypeId);
    const slot = itemUtils.getItemSlotById(wearable.id || wearable.erc1155TypeId);

    return (
        <ERC1155 item={{
            id: wearable.id || parseInt(wearable.erc1155TypeId),
            rarity: rarity,
            category: wearable.category,
            balance: wearable.balance,
            holders: wearable.holders,
            slot: slot,
            tooltip: tooltip,
            priceInWei: wearable.priceInWei,
            quantity: wearable.quantity
        }}>

            <div className={classes.iconWrapper}>
                <img
                    src={itemUtils.getWearableImg(wearable.id || wearable.erc1155TypeId)}
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