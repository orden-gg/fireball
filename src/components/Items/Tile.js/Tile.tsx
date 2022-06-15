import { Erc1155Categories } from 'data/types';

import { CardName } from '../common/CardName/CardName';
import { ERC1155 } from '../ERC1155/ERC1155';

import { TileImage } from './TileImage';

export function Tile({ data }: { data: any }) {

    return (
        <ERC1155
            className='tile'
            item={{
                id: data.id,
                rarity: 'golden',
                category: Erc1155Categories.Tile,
                balance: data.balance
            }}
        >
            <TileImage id={data.id} />
            <CardName
                item={data}
                itemName={data.name}
                itemRarity='golden'
            />
        </ERC1155>
    );
}
