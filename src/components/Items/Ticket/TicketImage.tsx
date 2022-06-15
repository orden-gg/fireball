import itemUtils from 'utils/itemUtils';

export function TicketImage({ ticket }: { ticket: any }) {
    return (
        <div>
            <img
                src={itemUtils.getTicketImg(ticket.name || itemUtils.getItemRarityName(ticket.erc1155TypeId))}
                alt={ticket.name || itemUtils.getItemRarityName(ticket.erc1155TypeId)}
            />
        </div>
    );
}
