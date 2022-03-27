import React from 'react';
import { Typography } from '@mui/material';
import classNames from 'classnames';

import ERC1155 from 'components/Items/ERC1155/ERC1155';
import itemUtils from 'utils/itemUtils';

import { ERC1155InnerStyles } from '../styles';

export default function Consumable({ consumable }) {
    const classes = ERC1155InnerStyles();

    const name = itemUtils.getItemNameById(consumable.id);
    const stats = itemUtils.getEmojiStatsById(consumable.id);

    return (
        <ERC1155 item={{
            id: consumable.id,
            rarity: 'drop',
            category: 2,
            balance: consumable.balance,
            listing: {
                listing: consumable.listing,
                price: consumable.price
            }
        }}>

            <div className={classes.iconWrapper}>
                <img
                    src={itemUtils.getWearableImg(consumable.id)}
                    alt={name}
                    className={classes.icon}
                />
            </div>

            <div className={classes.nameWrapper}>
                <Typography className={classNames(classes.name, classes.textHighlight, 'drop')}>
                    {name}
                </Typography>
            </div>

            <Typography variant='subtitle1'>
                {stats}
            </Typography>
        </ERC1155>
    )
}
