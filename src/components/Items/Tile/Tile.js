import { Erc1155Categories } from 'data/types';

import CardName from '../common/CardName/CardName';
import ERC1155 from '../ERC1155/ERC1155';

import TileImage from './TileImage';

export default function Tile({ tile }) {
    return (
        <ERC1155
            className='tile'
            item={{
                id: tile.id,
                rarity: 'golden',
                category: Erc1155Categories.Tile,
                balance: tile.balance
            }}
        >
            <TileImage id={tile.id} />

            <CardName
                item={tile}
                itemName={tile.name}
                itemRarity='golden'
            />
        </ERC1155>
    );
}
