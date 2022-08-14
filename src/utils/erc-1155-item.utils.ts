import { Erc1155Categories, ItemTypes } from 'shared/constants';
import { Erc1155Item, Erc1155ItemTuple } from 'shared/models';
import erc1155Items from 'data/items.data.json';

import { ItemUtils } from './item.utils';

export class Erc1155ItemUtils {
    public static getStaticWearables(): Erc1155ItemTuple[] {
        return erc1155Items
            .filter(erc1155Item => erc1155Item[ItemTypes.Category] === Number(Erc1155Categories.Wearable))
            .filter(erc1155Item => erc1155Item[ItemTypes.Name] !== 'The Void') as Erc1155ItemTuple[];
    }

    public static getWearablesIds(): number[] {
        return erc1155Items
            .map((erc1155Item, index: number) => ({
                name: erc1155Item[ItemTypes.Name],
                category: erc1155Item[ItemTypes.Category],
                id: index
            }))
            .filter(erc1155Item => erc1155Item.category === Number(Erc1155Categories.Wearable))
            .filter(erc1155Item => erc1155Item.name !== 'The Void')
            .map(erc1155Item => erc1155Item.id);
    }

    public static getMappedWearables(tupleWearables: Erc1155ItemTuple[]): Erc1155Item[] {
        const wearablesIds = Erc1155ItemUtils.getWearablesIds();
        const mappedModelWearables: Erc1155Item[] = tupleWearables.map((tupleWearable: Erc1155ItemTuple, index: number) => ({
            id: wearablesIds[index],
            name: tupleWearable[ItemTypes.Name],
            description: tupleWearable[ItemTypes.Description],
            author: tupleWearable[ItemTypes.Author],
            traitModifiers: {
                nrg: tupleWearable[ItemTypes.TraitModifiers][0],
                agg: tupleWearable[ItemTypes.TraitModifiers][1],
                spk: tupleWearable[ItemTypes.TraitModifiers][2],
                brn: tupleWearable[ItemTypes.TraitModifiers][3],
                eys: tupleWearable[ItemTypes.TraitModifiers][4],
                eyc: tupleWearable[ItemTypes.TraitModifiers][5]
            },
            slotPositions: {
                body: tupleWearable[ItemTypes.SlotPositions][0],
                face: tupleWearable[ItemTypes.SlotPositions][1],
                eyes: tupleWearable[ItemTypes.SlotPositions][2],
                head: tupleWearable[ItemTypes.SlotPositions][3],
                lHand: tupleWearable[ItemTypes.SlotPositions][4],
                rHand: tupleWearable[ItemTypes.SlotPositions][5],
                pet: tupleWearable[ItemTypes.SlotPositions][6],
                background: tupleWearable[ItemTypes.SlotPositions][7],
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
                x: tupleWearable[ItemTypes.Dimensions][0],
                y: tupleWearable[ItemTypes.Dimensions][1],
                width: tupleWearable[ItemTypes.Dimensions][2],
                height: tupleWearable[ItemTypes.Dimensions][3]
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
            rarity: ItemUtils.getRarityNameById(wearablesIds[index])
        }));

        return mappedModelWearables;
    }
}
