import { Address, BigInt } from '@graphprotocol/graph-ts';
import { Player } from '../../generated/schema';

export function loadOrCreatePlayer(id: Address, createIfNotFound: boolean = true): Player {
  let player = Player.load(id.toHexString());

  if (player == null && createIfNotFound) {
    player = new Player(id.toHexString());
    player.gotchisLentOut = new Array<BigInt>();
    player.gotchisBorrowed = new Array<BigInt>();
  }

  return player as Player;
}
