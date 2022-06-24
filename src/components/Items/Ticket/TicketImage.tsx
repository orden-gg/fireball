import { ItemUtils } from 'utils';

import { ERC1155InnerStyles } from '../styles';

export function TicketImage({ ticket }: { ticket: any }) {
    const classes = ERC1155InnerStyles();

    return (
        <div className={classes.iconWrapper}>
            <img
                src={ItemUtils.getTicketImg(ticket.name || ItemUtils.getItemRarityName(ticket.erc1155TypeId))}
                alt={ticket.name || ItemUtils.getItemRarityName(ticket.erc1155TypeId)}
                className={classes.icon}
            />
        </div>
    );
}
