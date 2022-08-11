import { WearableTypes } from 'shared/constants';
import { GotchiCollateral } from 'components/Gotchi/GotchiCollateral/GotchiCollateral';
import { WearableSlot } from 'components/Items/WearableSlot/WearableSlot';

import { GotchiInfoItem } from '../GotchiInfoList/components/GotchiInfoItem/GotchiInfoItem';
import { GotchiLevel } from '../GotchiLevel/GotchiLevel';
import { GotchiImage } from '../GotchiImage/GotchiImage';

import { gotchiViewStyles } from './styles';
import { GhstTokenIcon } from 'components/Icons/Icons';

interface GotchiViewProps {
    gotchi: any;
}

export function GotchiView({ gotchi }: GotchiViewProps) {
    const classes = gotchiViewStyles();

    return <div className={classes.gotchiView}>
        <div className={classes.wearables}>
            <WearableSlot id={gotchi.equippedWearables[WearableTypes.Head]} slotId={WearableTypes.Head} />
            <WearableSlot id={gotchi.equippedWearables[WearableTypes.Face]} slotId={WearableTypes.Face} />
            <WearableSlot id={gotchi.equippedWearables[WearableTypes.LHand]} slotId={WearableTypes.LHand} />
            <WearableSlot id={gotchi.equippedWearables[WearableTypes.Background]} slotId={WearableTypes.Background} />
        </div>
        <div className={classes.gotchiCenter}>
            <div className={classes.centerHead}>
                <GotchiInfoItem label='Rarity' value={`${gotchi.modifiedRarityScore}(${gotchi.baseRarityScore})`} className={classes.rarity} />
                <GotchiCollateral gotchi={gotchi} className={classes.collateral} />
            </div>
            <GotchiImage id={gotchi.id} equippedSetName={gotchi.equippedSetName} />
            <GotchiLevel level={gotchi.level} experience={gotchi.experience} toNextLevel={gotchi.toNextLevel} />
        </div>
        <div className={classes.wearables}>
            <WearableSlot id={gotchi.equippedWearables[WearableTypes.Eyes]} slotId={WearableTypes.Eyes} />
            <WearableSlot id={gotchi.equippedWearables[WearableTypes.Body]} slotId={WearableTypes.Body} />
            <WearableSlot id={gotchi.equippedWearables[WearableTypes.RHand]} slotId={WearableTypes.RHand} />
            <WearableSlot id={gotchi.equippedWearables[WearableTypes.Pet]} slotId={WearableTypes.Pet} />
        </div>
    </div>;
}
