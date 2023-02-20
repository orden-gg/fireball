import { ERC1155Item } from '../../generated/schema';
import { Address, BigInt } from '@graphprotocol/graph-ts';
import { AavegotchiDiamond__getItemTypeResultItemType_Struct } from '../../generated/AavegotchiDiamond/AavegotchiDiamond';

export function loadOrCreateItem(
  tokenId: BigInt,
  owner: Address,
  itemType: AavegotchiDiamond__getItemTypeResultItemType_Struct | null
): ERC1155Item {
  let item = ERC1155Item.load(tokenId.toString() + '-' + owner.toHexString());

  if (!item) {
    item = new ERC1155Item(tokenId.toString() + '-' + owner.toHexString());
    item.tokenId = tokenId.toI32();
    item.amount = 0;
    item.owner = owner.toHexString();
    item.equipped = 0;

    if (itemType) {
      item.category = itemType.category;
    }

    item.save();
  }

  return item;
}
