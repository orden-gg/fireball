import { Erc1155Categories } from 'data/types';

import CardName from '../common/CardName/CardName';
import ERC1155 from '../ERC1155/ERC1155';

import TileImage from './TileImage';

export default function Tile({ data }) {

    return (
        <ERC1155 item={{
            id: data.id,
            rarity: 'legendary',
            category: Erc1155Categories.Tile,
            balance: data.balance
        }}>
            <TileImage data={data} />
            <CardName
                item={data}
                itemName={data.name}
                itemRarity='golden'
            />
        </ERC1155>
    )
}
