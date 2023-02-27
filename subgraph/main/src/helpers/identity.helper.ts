import { Bytes, log } from '@graphprotocol/graph-ts';
import { AavegotchiOption, Gotchi, Identity } from '../../generated/schema';
import {
  ColorCommon,
  ColorMythicalHigh,
  ColorMythicalLow,
  ColorRareHigh,
  ColorRareLow,
  ColorUncommonHigh,
  ColorUncommonLow,
  ShapeCommon1,
  ShapeCommon2,
  ShapeCommon3,
  ShapeMythicalHigh,
  ShapeMythicalLow1,
  ShapeMythicalLow2,
  ShapeRareHigh1,
  ShapeRareHigh2,
  ShapeRareHigh3,
  ShapeRareLow1,
  ShapeRareLow2,
  ShapeRareLow3,
  ShapeUncommonHigh1,
  ShapeUncommonHigh2,
  ShapeUncommonHigh3,
  ShapeUncommonLow1,
  ShapeUncommonLow2,
  ShapeUncommonLow3,
  TraitsNumberTypes
} from '../shared';
import { loadOrCreateGotchiOption } from './gotchi.helper';

export function loadOrCreateIdentity(id: string): Identity {
  let identity = Identity.load(id);

  if (!identity) {
    identity = new Identity(id);
    identity.claimed = [];
    identity.unclaimed = [];
  }

  return identity;
}

export function updateIdentityByGotchi(gotchi: Gotchi): Identity {
  const color = getColorNameByValue(gotchi.numericTraits[TraitsNumberTypes.EYC]);
  const shape = getShapeNameByValue(gotchi.numericTraits[TraitsNumberTypes.EYS]);
  const identity = loadOrCreateIdentity(getIdentityId(gotchi.collateral, shape, color, gotchi.hauntId.toI32()));
  const identityClaimed = identity.claimed;

  identityClaimed.push(gotchi.id);

  identity.collateral = gotchi.collateral;
  identity.shape = shape;
  identity.color = color;
  identity.claimed = identityClaimed;

  return identity;
}

export function updateIdentityByOptions(unclaimedGotchi: AavegotchiOption): Identity {
  const shape = getShapeNameByValue(unclaimedGotchi.numericTraits[TraitsNumberTypes.EYS]);
  const color = getColorNameByValue(unclaimedGotchi.numericTraits[TraitsNumberTypes.EYC]);
  const identity = loadOrCreateIdentity(
    getIdentityId(unclaimedGotchi.collateralType, shape, color, unclaimedGotchi.hauntId)
  );

  const unclamedIdentities = identity.unclaimed;

  unclamedIdentities.push(unclaimedGotchi.id);

  identity.collateral = unclaimedGotchi.collateralType;
  identity.shape = shape;
  identity.color = color;
  identity.unclaimed = unclamedIdentities;

  return identity;
}

// @ts-ignore
export function removeUnclaimedIdentity(portalId: string, position: i32): Identity {
  const unclaimedGotchi = loadOrCreateGotchiOption(portalId, position);
  const identity = loadOrCreateIdentity(unclaimedGotchi.identity);
  const unclamedIdentities: string[] = new Array<string>();

  for (let i = 0; i < identity.unclaimed.length; i++) {
    const unclaimedGotchiId: string = identity.unclaimed[i];

    if (unclaimedGotchiId != unclaimedGotchi.id) {
      unclamedIdentities.push(unclaimedGotchiId);
    } else {
      log.warning('remove unclaimed gotchi {}, {}', [unclaimedGotchiId, unclaimedGotchi.id]);
    }
  }

  identity.unclaimed = unclamedIdentities;

  return identity;
}

// @ts-ignore
export function getIdentityId(collateral: Bytes, shape: string, color: string, hauntId: i32): string {
  const isMythLowShape = shape === ShapeMythicalLow1 || shape === ShapeMythicalLow2;

  return `${collateral.toHexString()}, ${isMythLowShape ? `${shape} h${hauntId}` : shape}, ${color}`;
}

// @ts-ignore
export function getShapeNameByValue(value: i32): string {
  if (value === 0) return ShapeMythicalLow1;
  else if (value === 1) return ShapeMythicalLow2;
  else if (value >= 2 && value <= 4) return ShapeRareLow1;
  else if (value === 5 || value === 6) return ShapeRareLow2;
  else if (value >= 7 && value <= 9) return ShapeRareLow3;
  else if (value >= 10 && value <= 14) return ShapeUncommonLow1;
  else if (value >= 15 && value <= 19) return ShapeUncommonLow2;
  else if (value >= 20 && value <= 24) return ShapeUncommonLow3;
  else if (value >= 25 && value <= 41) return ShapeCommon1;
  else if (value >= 42 && value <= 57) return ShapeCommon2;
  else if (value >= 58 && value <= 74) return ShapeCommon3;
  else if (value >= 75 && value <= 79) return ShapeUncommonHigh1;
  else if (value >= 80 && value <= 84) return ShapeUncommonHigh2;
  else if (value >= 85 && value <= 89) return ShapeUncommonHigh3;
  else if (value >= 90 && value <= 92) return ShapeRareHigh1;
  else if (value >= 93 && value <= 94) return ShapeRareHigh2;
  else if (value >= 95 && value <= 97) return ShapeRareHigh3;
  else return ShapeMythicalHigh;
}

// @ts-ignore
export function getColorNameByValue(value: i32): string {
  if (value === 0 || value === 1) return ColorMythicalLow;
  else if (value >= 2 && value <= 9) return ColorRareLow;
  else if (value >= 10 && value <= 24) return ColorUncommonLow;
  else if (value >= 25 && value <= 74) return ColorCommon;
  else if (value >= 75 && value <= 89) return ColorUncommonHigh;
  else if (value >= 90 && value <= 97) return ColorRareHigh;
  else return ColorMythicalHigh;
}
