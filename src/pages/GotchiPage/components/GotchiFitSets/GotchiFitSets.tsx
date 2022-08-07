import { useEffect, useState } from 'react';

import _ from 'lodash';

import { SetTypes, TRAITS_KEYS, WearableTypes, WEARABLE_SLOTS } from 'shared/constants';
import { GotchiSvgByStats } from 'components/Gotchi/GotchiImage/GotchiSvgByStats';
import wearableSets from 'data/sets.data.json';
import { ItemUtils } from 'utils';

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
            const setModifiers: number[] = [...set[SetTypes.TraitsBonuses]].splice(1, 4);
            const wareablesModifiers: Array<number[]> = set[SetTypes.WearableIds].map((wearable: number) =>
                ItemUtils.getTraitModifiersById(wearable)
            );
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

        for (const wearableId of wearables) {
            const slotPositions: boolean[] = ItemUtils.getSlotPositionsById(wearableId);
            const slotId: number = slotPositions.findIndex((isSlot: boolean) => isSlot);

            if (array[slotId] !== 0) {
                array[WearableTypes.RightHand] = wearableId;
            } else {
                array[slotId] = wearableId;
            }
        }

        return array;
    }

    return <div className={className} style={{ marginTop: 20 }}>
        {availableSets.map((set: any[], index: number) => {
            return <div key={index} style={{ display: 'inline-block', margin: '0 10px' }}>
                <GotchiSvgByStats gotchi={{
                    hauntId: gotchi.hauntId,
                    collateral: gotchi.collateral,
                    numericTraits: gotchi.numericTraits,
                    equippedWearables: setEquippedWearables(set[SetTypes.WearableIds])
                }} size='125px' />

                <div style={{ textAlign: 'center' }}>{set[SetTypes.Name]}</div>
            </div>;
        })}
    </div>;
}
