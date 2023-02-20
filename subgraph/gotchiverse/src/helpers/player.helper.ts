import { Address } from '@graphprotocol/graph-ts';
import { Player } from '../../generated/schema';

export function loadOrCreatePlayer(address: Address): Player {
    let player = Player.load(address.toHexString());

    if (!player) {
        player = new Player(address.toHexString());
        player.parcelsCount = 0;
    }

    return player;
}
