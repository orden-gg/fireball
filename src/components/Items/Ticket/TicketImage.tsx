import { ItemUtils } from 'utils';

export function TicketImage({ ticket }: { ticket: any }) {
    return (
        <div>
            <img
                src={ItemUtils.getTicketImg(ticket.name || ItemUtils.getItemRarityName(ticket.erc1155TypeId))}
                alt={ticket.name || ItemUtils.getItemRarityName(ticket.erc1155TypeId)}
            />
        </div>
    );
}
