import classNames from 'classnames';

import { WearableTypes } from 'shared/constants';
import { EthAddress } from 'components/EthAddress/EthAddress';
import { GotchiAging } from 'components/Gotchi/GotchiAging/GotchiAging';
import { GotchiTraits } from 'components/Gotchi/GotchiTraits/GotchiTraits';
import { WearableSlot } from '../Items/WearableSlot/WearableSlot';
import { GotchiImage } from './components/GotchiImage/GotchiImage';
import { GotchiLevel } from './components/GotchiLevel/GotchiLevel';
import { GotchiCollateral } from 'components/Gotchi/GotchiCollateral/GotchiCollateral';

import { gotchiPreviewStyles } from './styles';
import { ViewInAppButton } from 'components/ViewInAppButton/ViewInAppButton';

interface GotchiPreviewProps {
    gotchi: any;
    className?: string;
}

export function GotchiPreview({ gotchi, className }: GotchiPreviewProps) {
    const classes = gotchiPreviewStyles();

    return (
        <div className={classNames(classes.gotchi, className)}>
            <div className={classes.gotchiView}>
                <div className={classes.wearables}>
                    <WearableSlot id={gotchi.equippedWearables[WearableTypes.Head]} slotId={WearableTypes.Head} />
                    <WearableSlot id={gotchi.equippedWearables[WearableTypes.Face]} slotId={WearableTypes.Face} />
                    <WearableSlot id={gotchi.equippedWearables[WearableTypes.LHand]} slotId={WearableTypes.LHand} />
                    <WearableSlot id={gotchi.equippedWearables[WearableTypes.Background]} slotId={WearableTypes.Background} />
                </div>
                <div className={classes.gotchiCenter}>
                    <div className={classes.centerHead}>
                        <div className={classNames(classes.infoItem, classes.rarity)}>
                            <span className={classes.infoLabel}>Rarity:</span>
                            <span className={classes.infoValue}>{gotchi.modifiedRarityScore}({gotchi.baseRarityScore})</span>
                        </div>
                        <GotchiCollateral gotchi={gotchi} className={classes.collateral} />
                    </div>
                    <div className={classes.imageWrapper}>
                        <GotchiImage id={gotchi.id} />
                        {gotchi.equippedSetName && <span className={classes.setName}>{gotchi.equippedSetName}</span>}
                    </div>
                    <GotchiLevel level={gotchi.level} experience={gotchi.experience} toNextLevel={gotchi.toNextLevel} />
                </div>
                <div className={classes.wearables}>
                    <WearableSlot id={gotchi.equippedWearables[WearableTypes.Eyes]} slotId={WearableTypes.Eyes} />
                    <WearableSlot id={gotchi.equippedWearables[WearableTypes.Body]} slotId={WearableTypes.Body} />
                    <WearableSlot id={gotchi.equippedWearables[WearableTypes.RHand]} slotId={WearableTypes.RHand} />
                    <WearableSlot id={gotchi.equippedWearables[WearableTypes.Pet]} slotId={WearableTypes.Pet} />
                </div>
            </div>

            <div className={classes.body}>
                <div className={classes.title}>
                    <span className={classes.name}>{gotchi.name || 'Unnamed'}</span>
                    <EthAddress
                        address={gotchi.originalOwner?.id || gotchi.owner.id}
                        isShowIcon
                        isCopyButton
                        isPolygonButton
                        isClientLink
                    />
                </div>

                <div className={classes.infoList}>
                    <div className={classes.infoItem}>
                        <span className={classes.infoLabel}>id:</span>
                        <span className={classes.infoValue}>{gotchi.id}</span>
                    </div>
                    <div className={classes.infoItem}>
                        <span className={classes.infoLabel}>kinship:</span>
                        <span className={classes.infoValue}>{gotchi.kinship}</span>
                    </div>
                    <div className={classes.infoItem}>
                        <span className={classes.infoLabel}>haunt:</span>
                        <span className={classes.infoValue}>{gotchi.hauntId}</span>
                    </div>
                </div>

                <GotchiTraits traits={gotchi.numericTraits} currentTraits={gotchi.modifiedNumericTraits} className={classes.traits} />
            </div>
        </div>
    );
}
