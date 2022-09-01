
import { VOID_WEARABLE, HAUNT_ONE_BACKGROUND_WEARABLE, WearableBenefitIndex } from 'shared/constants';
import {
    Erc1155Categories,
    Erc1155DimensionsNumberTypes,
    ItemTypes,
    TraitsNumberTypes,
    WearableTypes
} from 'shared/constants';
import { Erc1155ItemTuple, Wearable } from 'shared/models';
import erc1155Items from 'data/items.data.json';

import { ItemUtils } from './item.utils';

export class Erc1155ItemUtils {
    public static getStaticWearables(): Erc1155ItemTuple[] {
        return erc1155Items
            .filter(erc1155Item => erc1155Item[ItemTypes.Category] === Number(Erc1155Categories.Wearable))
            .filter(erc1155Item =>
                erc1155Item[ItemTypes.Name] !== VOID_WEARABLE && erc1155Item[ItemTypes.Name] !== HAUNT_ONE_BACKGROUND_WEARABLE
            ) as Erc1155ItemTuple[];
    }

    public static getMappedWearables(tupleWearables: Erc1155ItemTuple[]): Wearable[] {
        const mappedModelWearables: Wearable[] = tupleWearables.map((tupleWearable: Erc1155ItemTuple) => ({
            id: tupleWearable[ItemTypes.Id],
            name: tupleWearable[ItemTypes.Name],
            description: tupleWearable[ItemTypes.Description],
            author: tupleWearable[ItemTypes.Author],
            traitModifiers: {
                nrg: tupleWearable[ItemTypes.TraitModifiers][TraitsNumberTypes.NRG],
                agg: tupleWearable[ItemTypes.TraitModifiers][TraitsNumberTypes.AGG],
                spk: tupleWearable[ItemTypes.TraitModifiers][TraitsNumberTypes.SPK],
                brn: tupleWearable[ItemTypes.TraitModifiers][TraitsNumberTypes.BRN],
                eys: tupleWearable[ItemTypes.TraitModifiers][TraitsNumberTypes.EYS],
                eyc: tupleWearable[ItemTypes.TraitModifiers][TraitsNumberTypes.EYC]
            },
            slotPositions: {
                body: tupleWearable[ItemTypes.SlotPositions][WearableTypes.Body],
                face: tupleWearable[ItemTypes.SlotPositions][WearableTypes.Face],
                eyes: tupleWearable[ItemTypes.SlotPositions][WearableTypes.Eyes],
                head: tupleWearable[ItemTypes.SlotPositions][WearableTypes.Head],
                rHand: tupleWearable[ItemTypes.SlotPositions][WearableTypes.RHand],
                lHand: tupleWearable[ItemTypes.SlotPositions][WearableTypes.LHand],
                pet: tupleWearable[ItemTypes.SlotPositions][WearableTypes.Pet],
                background: tupleWearable[ItemTypes.SlotPositions][WearableTypes.Background],
                // as it's unknown slot for now there is no enum equivalent for this
                unknownSlot1: tupleWearable[ItemTypes.SlotPositions][8],
                unknownSlot2: tupleWearable[ItemTypes.SlotPositions][9],
                unknownSlot3: tupleWearable[ItemTypes.SlotPositions][10],
                unknownSlot4: tupleWearable[ItemTypes.SlotPositions][11],
                unknownSlot5: tupleWearable[ItemTypes.SlotPositions][12],
                unknownSlot6: tupleWearable[ItemTypes.SlotPositions][13],
                unknownSlot7: tupleWearable[ItemTypes.SlotPositions][14],
                unknownSlot8: tupleWearable[ItemTypes.SlotPositions][15]
            },
            allowedCollaterals: tupleWearable[ItemTypes.AllowedCollaterals],
            dimensions: {
                x: tupleWearable[ItemTypes.Dimensions][Erc1155DimensionsNumberTypes.X],
                y: tupleWearable[ItemTypes.Dimensions][Erc1155DimensionsNumberTypes.Y],
                width: tupleWearable[ItemTypes.Dimensions][Erc1155DimensionsNumberTypes.WIDTH],
                height: tupleWearable[ItemTypes.Dimensions][Erc1155DimensionsNumberTypes.HEIGHT]
            },
            ghstPrice: tupleWearable[ItemTypes.GhstPrice],
            maxQuantity: tupleWearable[ItemTypes.MaxQuantity],
            totalQuantity: tupleWearable[ItemTypes.TotalQuantity],
            svgId: tupleWearable[ItemTypes.SvgId],
            rarityScoreModifier: tupleWearable[ItemTypes.RarityScoreModifier],
            canPurchaseWithGhst: tupleWearable[ItemTypes.CanPurchaseWithGhst],
            minLevel: tupleWearable[ItemTypes.MinLevel],
            canBeTransferred: tupleWearable[ItemTypes.CanBeTransferred],
            category: tupleWearable[ItemTypes.Category],
            kinshipBonus: tupleWearable[ItemTypes.KinshipBonus],
            experienceBonus: tupleWearable[ItemTypes.ExperienceBonus],
            rarity: ItemUtils.getRarityNameById(tupleWearable[ItemTypes.Id]),
            rarityId: ItemUtils.getItemRarityId(ItemUtils.getRarityNameById(tupleWearable[ItemTypes.Id])),
            benefit: {
                first: tupleWearable[ItemTypes.WearableBenefitType] ?
                    tupleWearable[ItemTypes.WearableBenefitType][WearableBenefitIndex.First] : '',
                second: tupleWearable[ItemTypes.WearableBenefitType] ?
                    tupleWearable[ItemTypes.WearableBenefitType][WearableBenefitIndex.Second] : ''
            },
            itemType: tupleWearable[ItemTypes.WearableType]
        }));

        return mappedModelWearables;
    }
}
