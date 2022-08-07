import { useEffect, useState } from 'react';

import _ from 'lodash';

import { Erc1155Categories, SetTypes, TRAITS_KEYS, WearableTypes, WEARABLE_SLOTS } from 'shared/constants';
import { GotchiSvgByStats } from 'components/Gotchi/GotchiImage/GotchiSvgByStats';
// import { CardImage } from 'components/ItemCard/components';
import { wearableSets } from 'data/wearableSets.data';
import { CommonUtils, ItemUtils } from 'utils';

interface GotchiFitSetsProps {
    gotchi : any;
    className?: string;
}
// This is test component, please avoid commenting it, or tell me, i'll move it out of project :)
export function GotchiFitSets({ gotchi, className } : GotchiFitSetsProps) {
    const [availableSets, setAvailableSets] = useState<any[]>([]);

    console.log(gotchi);

    useEffect(() => {
        const filteredTraits = [...gotchi.numericTraits].splice(0, 4);
        const sets: any[] = wearableSets.filter((set: any[]) => {
            const setModifiers = [...set[SetTypes.Modifiers]].splice(1, 4);
            const wareablesModifiers = set[SetTypes.Wearables].map((wearable: number) => {
                const stats: Array<{name: string}> = ItemUtils.getWearableStatsById(wearable)

                return [...TRAITS_KEYS].splice(0, 4).map((name: string) => {
                    const statValue: number | undefined =  stats[name.toUpperCase()];

                    return Number(statValue) || 0;
                });
            });

            const concatedModifiers: number[] = concatTraits([concatTraits(wareablesModifiers), setModifiers]);

            return getIsSetAvailable(filteredTraits, concatedModifiers);
        });

        setAvailableSets(sets);
    }, [gotchi]);

    const concatTraits = (traitsList: Array<number[]>): number[] => {
        const result: number[] = [];

        for (const array of traitsList) {
            array.forEach((value, index) => {
                if (result[index] !== undefined) {
                    result[index] += value;
                } else {
                    result[index] = value;
                }
            });
        }

        return result;
    }

    const getIsSetAvailable = (traits: number[], wearablesModifiers: number[]): boolean => {
        const isSetAvailable: boolean = traits.every((trait: number, index: number) =>
            trait >= 50 ? (
                wearablesModifiers[index] >= 0
            ) : (
                wearablesModifiers[index] <= 0
            )
        );

        return isSetAvailable;
    };

    const setEquippedWearables = (wearables: number[]): number[] => {
        const array: number[] = _.fill(Array(16), 0);
        const hands = WEARABLE_SLOTS[WearableTypes.Hands].toLowerCase();

        for (const wearableId of wearables) {
            const slot: string = ItemUtils.getItemSlotById(wearableId);

            let slotId: number = WEARABLE_SLOTS.findIndex((name: string) =>
                name.toLowerCase() === slot
            );


            if (slot === hands && array[slotId] !== 0) {
                slotId = WearableTypes.RightHand;
            }

            array[slotId] = wearableId;
        }

        return array;
    }

    return <div className={className} style={{ marginTop: 20 }}>
        {availableSets.map((set: any[], index: number) => {
            return <span key={index} style={{ display: 'inline-block', margin: '0 10px' }}>
                <GotchiSvgByStats gotchi={{
                    hauntId: gotchi.hauntId,
                    collateral: gotchi.collateral,
                    numericTraits: gotchi.numericTraits,
                    equippedWearables: setEquippedWearables(set[SetTypes.Wearables])
                }} size='125px' />

                <div style={{ textAlign: 'center' }}>{set[SetTypes.Name]}</div>

                {/* {set[2].map((id: number, index: number) => <CardImage id={id} key={index} category={Erc1155Categories.Wearable} />)}
                <div>{[...set[3]].splice(1,4).join('/')}</div>
                <div>{[...gotchi.numericTraits].splice(0, 4).join('/')}</div>
                <div>{set[0]}</div> */}
            </span>;
        })}
    </div>;
}
