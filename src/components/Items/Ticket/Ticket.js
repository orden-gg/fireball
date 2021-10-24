import React from 'react';
import { Typography } from '@mui/material';
import classNames from 'classnames';
import useStyles from '../styles';

import commonUtils from '../../../utils/commonUtils';
import itemUtils from '../../../utils/itemUtils';
import ERC1155 from '../ERC1155/ERC1155';

export default function Ticket({ticket}) {
    const classes = useStyles();

    return (
        <ERC1155 item={{ id: ticket.id, rarity: ticket.name, category: 3, balance: ticket.balance }}>
            <div className={classes.iconWrapper}>
                <img
                    src={itemUtils.getTicketImg(ticket.name)}
                    alt={ticket.name}
                    className={classes.icon}
                />
            </div>

            <div className={classes.nameWrapper}>
                <Typography className={classNames(classes.name, classes.textHighlight, ticket.name)}>
                    {commonUtils.capitalize(ticket.name)} ticket
                </Typography>
            </div>
        </ERC1155>
    )
}