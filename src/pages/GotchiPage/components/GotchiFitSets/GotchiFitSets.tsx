import { useEffect, useState } from 'react';

import classNames from 'classnames';
import _ from 'lodash';

import { SetTypes, WearableTypes } from 'shared/constants';
import { SlotWearable } from 'components/Items/SlotWearable/SlotWearable';
import { GotchiImage } from 'components/Gotchi/GotchiImage/GotchiImage';
import wearableSets from 'data/sets.data.json';
import { ItemUtils } from 'utils';

import { gotchiFitSetsStyles } from './styles';
import { CardStats } from 'components/ItemCard/components';

interface GotchiFitSetsProps {
    gotchi : any;
    className?: string;
}

interface Set {
    bonus: number;
    data: any[];
    equippedWearables: number[];
}

export function GotchiFitSets({ gotchi, className } : GotchiFitSetsProps) {
    const classes = gotchiFitSetsStyles();

    const [availableSets, setAvailableSets] = useState<Array<Set>>([]);

    useEffect(() => {
        const filteredTraits = [...gotchi.numericTraits].splice(0, 4);
        const sets: Array<Set> = [];

        wearableSets.forEach((set: any[]) => {
            const setModifiers: number[] = [...set[SetTypes.TraitsBonuses]].splice(1, 4);
            const wareablesModifiers: Array<number[]> = set[SetTypes.WearableIds].map((wearable: number) =>
                ItemUtils.getTraitModifiersById(wearable)
            );
            const wareablesRS: number[] = set[SetTypes.WearableIds]
                .map((wearable: number) =>
                    ItemUtils.getRarityScoreModifierById(wearable)
                )
                .reduce((prev, current) => prev + current, 0);
            const concatedModifiers: number[] = concatTraits([concatTraits(wareablesModifiers), setModifiers]);
            const isSetAvailable = getIsSetAvailable(filteredTraits, concatedModifiers);

            if (isSetAvailable) {
                const bonusRs = getBonusRs(concatedModifiers, filteredTraits) + set[SetTypes.TraitsBonuses][0] + wareablesRS;
                const equippedWearables = getEquippedWearables(set[SetTypes.WearableIds]);

                sets.push({ bonus: bonusRs, data: set, equippedWearables: equippedWearables });
            }
        });

        sets.sort((curentSet: Set, nextSet: Set) => nextSet.bonus - curentSet.bonus);

        setAvailableSets(sets);
    }, [gotchi]);

    const getBonusRs = (modifiers: number[], traits: number[]): number => {
        const traitsWithModifiers: number[] = traits.map((trait: number, index: number) => trait + modifiers[index]);

        return traitsWithModifiers.reduce((prev: number, current: number, index: number) => {
            return prev + Math.abs(current - traits[index]);
        }, 0);
    };

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
    };

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

    const getEquippedWearables = (wearables: number[]): number[] => {
        const array: number[] = _.fill(Array(16), 0);

        for (const wearableId of wearables) {
            const slotPositions: boolean[] = ItemUtils.getSlotPositionsById(wearableId);
            const slotId: number = slotPositions.findIndex((isSlot: boolean) => isSlot);

            if (array[slotId] !== 0) {
                array[WearableTypes.RHand] = wearableId;
            } else {
                array[slotId] = wearableId;
            }
        }

        return array;
    };

    return <div className={classNames(classes.setsList, className)}>
        {availableSets.map((set: Set, index: number) => {

            return (
                <div key={index} className={classNames(classes.set)}>
                    <div className={classes.setImage}>
                        <GotchiImage
                            gotchi={{
                                hauntId: gotchi.hauntId,
                                collateral: gotchi.collateral,
                                numericTraits: gotchi.numericTraits,
                                equippedWearables: set.equippedWearables
                            }}
                            renderSvgByStats
                        />
                    </div>

                    <p className={classes.setName}>{set.data[SetTypes.Name]}</p>

                    <div className={classes.setBonus}>
                        <span className={classes.setBonusRS}><span>RS</span>+{set.data[SetTypes.TraitsBonuses][0]}</span>
                        <CardStats stats={[...set.data[SetTypes.TraitsBonuses]].slice(1, 4)} className={classes.setTraits} />
                    </div>

                    <span className={classes.setRS}><span>+{set.bonus}</span> RS</span>

                    <div className={classNames(classes.setWearables, classes.setWearablesLeft)}>
                        <div className={classes.setWearable}>
                            <SlotWearable id={set.equippedWearables[WearableTypes.Head]} slotId={WearableTypes.Head} />
                        </div>
                        <div className={classes.setWearable}>
                            <SlotWearable id={set.equippedWearables[WearableTypes.Face]} slotId={WearableTypes.Face} />
                        </div>
                        <div className={classes.setWearable}>
                            <SlotWearable id={set.equippedWearables[WearableTypes.LHand]} slotId={WearableTypes.LHand} />
                        </div>
                        <div className={classes.setWearable}>
                            <SlotWearable id={set.equippedWearables[WearableTypes.Background]} slotId={WearableTypes.Background} />
                        </div>
                    </div>

                    <div className={classNames(classes.setWearables, classes.setWearablesRight)}>
                        <div className={classes.setWearable}>
                            <SlotWearable id={set.equippedWearables[WearableTypes.Eyes]} slotId={WearableTypes.Eyes} />
                        </div>
                        <div className={classes.setWearable}>
                            <SlotWearable id={set.equippedWearables[WearableTypes.Body]} slotId={WearableTypes.Body} />
                        </div>
                        <div className={classes.setWearable}>
                            <SlotWearable id={set.equippedWearables[WearableTypes.RHand]} slotId={WearableTypes.RHand} />
                        </div>
                        <div className={classes.setWearable}>
                            <SlotWearable id={set.equippedWearables[WearableTypes.Pet]} slotId={WearableTypes.Pet} />
                        </div>
                    </div>
                </div>
            );
        })}
    </div>;
}
