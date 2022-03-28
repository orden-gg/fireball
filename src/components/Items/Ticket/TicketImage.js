import React from 'react';

import itemUtils from 'utils/itemUtils';

import { ERC1155InnerStyles } from '../styles';

export default function TicketImage({ ticket }) {
    const classes = ERC1155InnerStyles();

    return (
        <div className={classes.iconWrapper}>
            <img
                src={itemUtils.getTicketImg(ticket.name || itemUtils.getItemRarityName(ticket.erc1155TypeId))}
                alt={ticket.name || itemUtils.getItemRarityName(ticket.erc1155TypeId)}
                className={classes.icon}
            />
        </div>
    );
}
