import { BigInt } from '@graphprotocol/graph-ts';
import { Parcel, Tile } from '../../generated/schema';

export function loadOrCreateTile(parcelId: BigInt, tileId: BigInt, x: BigInt, y: BigInt): Tile {
    const id = 'tile-' + tileId.toString() + '-' + parcelId.toString() + '-' + x.toString() + '-' + y.toString();
    let tile = Tile.load(id);

    if (!tile) {
        tile = new Tile(id);
        tile.tileId = tileId.toI32();
        tile.x = x.toI32();
        tile.y = y.toI32();
    }

    tile.parcel = parcelId.toString();

    return tile;
}

export const equipTile = (parcel: Parcel, tileId: BigInt, x: BigInt, y: BigInt): Parcel => {
    const id = 'tile-' + tileId.toString() + '-' + parcel.id.toString() + '-' + x.toString() + '-' + y.toString();
    const tiles = parcel.tiles;

    tiles.push(id);
    parcel.tiles = tiles;

    return parcel;
};

export const unequipTile = (parcel: Parcel, tileId: BigInt, x: BigInt, y: BigInt): Parcel => {
    const id = 'tile-' + tileId.toString() + '-' + parcel.id.toString() + '-' + x.toString() + '-' + y.toString();
    const tiles = parcel.tiles;
    const newTiles = new Array<string>();

    for (let i = 0; i < tiles.length; i++) {
        const item = tiles[i];

        // eslint-disable-next-line
        if (item != id) {
            newTiles.push(item);
        }
    }

    parcel.tiles = newTiles;

    return parcel;
};
