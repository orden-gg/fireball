import { BigInt, ethereum } from '@graphprotocol/graph-ts';
import { Portal } from '../../generated/schema';

export function loadOrCreatePortal(id: BigInt, createIfNotFound: boolean = true): Portal {
  let portal = Portal.load(id.toString());

  if (portal == null && createIfNotFound) {
    portal = new Portal(id.toString());
    portal.timesTraded = BigInt.zero();
    portal.historicalPrices = [];
    portal.hauntId = BigInt.zero();
  }

  return portal as Portal;
}
