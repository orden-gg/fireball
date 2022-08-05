import classNames from 'classnames';

import { WearableTypes } from 'shared/constants';
import { EthAddress } from 'components/EthAddress/EthAddress';
import { GotchiTraits } from 'components/Gotchi/GotchiTraits/GotchiTraits';
import { GotchiWearable } from './components/GotchiWearable/GotchiWearable';
import { GotchiImage } from './components/GotchiImage/GotchiImage';
import { GotchiLevel } from './components/GotchiLevel/GotchiLevel';
import { GotchiCollateral } from 'components/Gotchi/GotchiCollateral/GotchiCollateral';

import { gotchiPreviewStyles } from './styles';

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
                    <GotchiWearable wearables={gotchi.equippedWearables} slotId={WearableTypes.Head} />
                    <GotchiWearable wearables={gotchi.equippedWearables} slotId={WearableTypes.Face} />
                    <GotchiWearable wearables={gotchi.equippedWearables} slotId={WearableTypes.LHand} />
                    <GotchiWearable wearables={gotchi.equippedWearables} slotId={WearableTypes.Background} />
                </div>
                <div className={classes.gotchiCenter}>
                    <div className={classes.centerHead}>
                        <div className={classNames(classes.infoItem, classes.rarity)}>
                            <span className={classes.infoLabel}>Rarity:</span>
                            <span className={classes.infoValue}>{gotchi.modifiedRarityScore}({gotchi.baseRarityScore})</span>
                        </div>
                        <GotchiCollateral gotchi={gotchi} className={classes.collateral} />
                    </div>
                    <GotchiImage id={gotchi.id} />
                    <GotchiLevel level={gotchi.level} experience={gotchi.experience} toNextLevel={gotchi.toNextLevel} />
                </div>
                <div className={classes.wearables}>
                    <GotchiWearable wearables={gotchi.equippedWearables} slotId={WearableTypes.Eyes} />
                    <GotchiWearable wearables={gotchi.equippedWearables} slotId={WearableTypes.Body} />
                    <GotchiWearable wearables={gotchi.equippedWearables} slotId={WearableTypes.RHand} />
                    <GotchiWearable wearables={gotchi.equippedWearables} slotId={WearableTypes.Pet} />
                </div>
            </div>

            <div className={classNames(classes.body, 'vertical')}>
                <div className={classes.title}>
                    <span className={classes.name}>{gotchi.name}</span>
                    <EthAddress
                        address={gotchi.originalOwner?.id || gotchi.owner.id}
                        isShowIcon
                        isCopyButton
                        isPolygonButton
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
