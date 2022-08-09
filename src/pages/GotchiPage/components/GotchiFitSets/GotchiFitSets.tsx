import { useEffect, useState } from 'react';

import classNames from 'classnames';

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
            const wareablesBonusRS: number[] = set[SetTypes.WearableIds]
                .map((wearable: number) =>
                    ItemUtils.getRarityScoreModifierById(wearable)
                )
                .reduce((prev, current) => prev + current, 0);
            const combinedTraitsModifiers = ItemUtils.combineTraitsModifiers(wareablesModifiers);
            const combinedModifiers: number[] = ItemUtils.combineTraitsModifiers([combinedTraitsModifiers, setModifiers]);
            const isSetAvailable = ItemUtils.getIsSetAvailable(filteredTraits, combinedModifiers);

            if (isSetAvailable) {
                const bonusRs = set[SetTypes.TraitsBonuses][0] + wareablesBonusRS;
                const bonusRsByTraits = ItemUtils.getBonusRsByTraits(combinedModifiers, filteredTraits);
                const equippedWearables = ItemUtils.getEquippedWearables(set[SetTypes.WearableIds]);

                sets.push({ bonus: bonusRs + bonusRsByTraits, data: set, equippedWearables: equippedWearables });
            }
        });

        sets.sort((curentSet: Set, nextSet: Set) => nextSet.bonus - curentSet.bonus);

        setAvailableSets(sets);
    }, [gotchi]);

    return <div className={classNames(classes.setsList, className)}>
        {availableSets.map((set: Set, index: number) =>
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
                    <SlotWearable
                        className={classes.setWearable}
                        id={set.equippedWearables[WearableTypes.Head]}
                        slotId={WearableTypes.Head}
                    />
                    <SlotWearable
                        className={classes.setWearable}
                        id={set.equippedWearables[WearableTypes.Face]}
                        slotId={WearableTypes.Face}
                    />
                    <SlotWearable
                        className={classes.setWearable}
                        id={set.equippedWearables[WearableTypes.LHand]}
                        slotId={WearableTypes.LHand}
                    />
                    <SlotWearable
                        className={classes.setWearable}
                        id={set.equippedWearables[WearableTypes.Background]}
                        slotId={WearableTypes.Background}
                    />
                </div>

                <div className={classNames(classes.setWearables, classes.setWearablesRight)}>
                    <SlotWearable
                        className={classes.setWearable}
                        id={set.equippedWearables[WearableTypes.Eyes]}
                        slotId={WearableTypes.Eyes}
                    />
                    <SlotWearable
                        className={classes.setWearable}
                        id={set.equippedWearables[WearableTypes.Body]}
                        slotId={WearableTypes.Body}
                    />
                    <SlotWearable
                        className={classes.setWearable}
                        id={set.equippedWearables[WearableTypes.RHand]}
                        slotId={WearableTypes.RHand}
                    />
                    <SlotWearable
                        className={classes.setWearable}
                        id={set.equippedWearables[WearableTypes.Pet]}
                        slotId={WearableTypes.Pet}
                    />
                </div>
            </div>
        )}
    </div>;
}
