import React from 'react';
import { Typography } from '@mui/material';
import classNames from 'classnames';

import { ERC1155InnerStyles } from '../styles';

import commonUtils from '../../../utils/commonUtils';
import itemUtils from '../../../utils/itemUtils';
import ERC1155 from '../ERC1155/ERC1155';

export default function Ticket({ticket}) {
    const classes = ERC1155InnerStyles();

    return (
        <ERC1155 item={{
            id: ticket.id || parseInt(ticket.erc1155TypeId),
            rarity: ticket.name || itemUtils.getItemRarityName(ticket.erc1155TypeId),
            category: 3,
            balance: ticket.balance,
            priceInWei: ticket.priceInWei,
            quantity: ticket.quantity
        }}>
            <div className={classes.iconWrapper}>
                <img
                    src={itemUtils.getTicketImg(ticket.name || itemUtils.getItemRarityName(ticket.erc1155TypeId))}
                    alt={ticket.name || itemUtils.getItemRarityName(ticket.erc1155TypeId)}
                    className={classes.icon}
                />
            </div>

            <div className={classes.nameWrapper}>
                <Typography className={classNames(classes.name, classes.textHighlight, ticket.name)}>
                    {commonUtils.capitalize(ticket.name || itemUtils.getItemRarityName(ticket.erc1155TypeId))} ticket
                </Typography>
            </div>
        </ERC1155>
    )
}