import classNames from 'classnames';

import itemUtils from 'utils/itemUtils';

import TicketImage from './TicketImage';
import HorizontalPrice from '../common/HorizontalPrice/HorizontalPrice';
import HorizontalLink from '../common/HorizontalLink/HorizontalLink';
import CardName from '../common/CardName/CardName';
import CardStats from '../common/CardStats/CardStats';

import styles from './../styles';

export default function TicketHorizontal({ ticket, render }) {
    const classes = styles();

    const gotchiSections = {
        // image
        imageCell(children) {
            return (
                <div className={classes.ticketImageCell}>
                    {children}
                </div>
            );
        },

        infoCell(children) {
            return (
                <div className={classes.ticketInfoCell} key={`${ticket.id}-infoCell`}>
                    {children}
                </div>
            );
        },

        priceCell(children) {
            return (
                <div key={`${ticket.id}-priceCell`} className={classes.ticketPriceCell}>
                    {children}
                </div>
            );
        },

        get cardStats() {
            return (
                <CardStats itemStats={`Quantity: ${ticket.quantity}`} />
            );
        },

        get cardName() {
            return (
                <CardName
                    itemName={`${ticket.name || itemUtils.getItemRarityName(ticket.erc1155TypeId)} ticket`}
                    itemRarity={itemUtils.getItemRarityName(ticket.erc1155TypeId)}
                    item={ticket}
                />
            );
        },

        // image
        get image() {
            return <TicketImage ticket={ticket} key={`${ticket.id}-image`}/>
        },

        get name() {
            return (
                <HorizontalLink item={ticket} url={'https://aavegotchi.com/baazaar/erc1155/'} />
            );
        },

        // price
        get price() {
            return <HorizontalPrice label='Sold for ' item={ticket} key={`${ticket.id}-ticket-price`} />
        }
    }

    function renderSection(value) {
        if (typeof value === 'string') {
            return gotchiSections[value];
        }

        return (
            Object.keys(value).map(key => (
                gotchiSections[key](value[key].map(item => (
                    renderSection(item)
                )))
            ))
        )
    }

    return (
        <div className={classNames(classes.horizontalCard, ticket.name || itemUtils.getItemRarityName(ticket.erc1155TypeId) )}>
            {render.map(name => {
                return renderSection(name)
            })}
        </div>
    );
}
