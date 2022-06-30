import classNames from 'classnames';

import { Erc1155Categories } from 'shared/constants';

import { AlchemicaPrice } from '../common/AlchemicaPrice/AlchemicaPrice';
import { CardName } from '../common/CardName/CardName';
import { ERC1155 } from '../ERC1155/ERC1155';

import { TileImage } from './TileImage';
import { tileStyles } from './styles';

export function Tile({ tile, showPrice }: { tile: any, showPrice?: any }) {
    const classes = tileStyles();

    return (
        <ERC1155
            className={classNames(classes.tile, 'tile')}
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

            { showPrice &&
                <AlchemicaPrice alchemica={tile.alchemicaCost} />
            }
        </ERC1155>
    );
}
