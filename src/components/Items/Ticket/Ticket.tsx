import { ERC1155 } from 'components/Items/ERC1155/ERC1155';
import { ItemUtils } from 'utils';

import { TicketImage } from './TicketImage';
import { CardName } from '../common/CardName/CardName';

interface TicketProps {
    ticket: any;
    isShopItem?: boolean;
}

export function Ticket({ ticket, isShopItem = false }: TicketProps) {
    const ticketRarity: any = ticket.name || ItemUtils.getItemRarityName(ticket.erc1155TypeId);

    return (
        <ERC1155 item={{
            id: typeof ticket.id === 'number' ? ticket.id : parseInt(ticket.erc1155TypeId),
            rarity: ticket.name || ItemUtils.getItemRarityName(ticket.erc1155TypeId),
            category: 3,
            balance: ticket.balance,
            priceInWei: ticket.priceInWei,
            quantity: ticket.quantity,
            listing: {
                listing: ticket.listing,
                price: ticket.price
            },
            isShopItem
        }}>
            <TicketImage ticket={ticket} />
            <CardName
                item={ticket}
                itemName={`${ticketRarity} ticket`}
                itemRarity={ticketRarity}
            />
        </ERC1155>
    );
}
