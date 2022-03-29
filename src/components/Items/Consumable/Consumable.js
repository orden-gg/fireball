import React from 'react';

import ConsumableImg from './ConsumableImg';
import ConsumableStats from './ConsumableStats';
import CardName from '../common/CardName/CardName';
import ERC1155 from '../ERC1155/ERC1155';

export default function Consumable({ consumable }) {
    return (
        <ERC1155 item={{
            id: consumable.id,
            rarity: 'drop',
            category: 2,
            balance: consumable.balance,
            listing: {
                listing: consumable.listing,
                price: consumable.price
            },
            shouldLoadCurrent: false
        }}>
            <ConsumableImg consumable={consumable} />
            <CardName item={consumable} />
            <ConsumableStats consumable={consumable} />
        </ERC1155>
    )
}
