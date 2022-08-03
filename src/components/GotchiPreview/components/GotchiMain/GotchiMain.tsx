import { useState } from 'react';

import classNames from 'classnames';

import { GOTCHI_SIDES, WearableTypes } from 'shared/constants';
import { Subtitle } from 'components/Subtitle/Subtitle';
import { GotchiSvg } from 'components/Gotchi/GotchiImage/GotchiSvg';
import { GotchiTraits } from 'components/Gotchi/GotchiTraits/GotchiTraits';

import { GotchiWearable } from '../GotchiWearable/GotchiWearable';
import { GotchiLevel } from '../GotchiLevel/GotchiLevel';

import { gotchiMainStyles } from './styles';
import { gotchiPreviewStyles } from 'components/GotchiPreview/styles';

interface GotchiMainProps {
    gotchi: any;
    className?: string;
}

export function GotchiMain({ gotchi, className }: GotchiMainProps) {
    const classes = { ...gotchiMainStyles(), ...gotchiPreviewStyles() };

    const [view, setView] = useState<string>('svg');

    return (
        <div className={classNames(classes.gotchiMain, className)}>
            <div className={classes.title}>
                <Subtitle className={classes.titleText} innerBg='background.default' variant='h4'>
                    <>
                        {gotchi.name}
                        (<span>{gotchi.id}</span>)
                    </>
                </Subtitle>
            </div>

            <div className={classes.container}>
                <div className={classes.gotchiView}>
                    <div className={classes.wearables}>
                        <GotchiWearable wearables={gotchi.equippedWearables} slotId={WearableTypes.Head} />
                        <GotchiWearable  wearables={gotchi.equippedWearables} slotId={WearableTypes.Face} />
                        <GotchiWearable  wearables={gotchi.equippedWearables} slotId={WearableTypes.LHand} />
                        <GotchiWearable  wearables={gotchi.equippedWearables} slotId={WearableTypes.Background} />
                    </div>
                    <div className={classes.gotchiCenter}>
                        <div className={classNames(classes.gotchiSvg, 'hide-bg')}>
                            <GotchiSvg id={gotchi.id} size='100%' view={view} />
                            {GOTCHI_SIDES.map((name: string) =>
                                <div
                                    className={classNames(classes.side, classes[`${name}Side`])}
                                    onMouseEnter={() => setView(name)}
                                    key={name}
                                ></div>
                            )}
                        </div>

                        <GotchiLevel level={gotchi.level} experience={gotchi.experience} toNextLevel={gotchi.toNextLevel} />
                    </div>
                    <div className={classes.wearables}>
                        <GotchiWearable  wearables={gotchi.equippedWearables} slotId={WearableTypes.Eyes} />
                        <GotchiWearable  wearables={gotchi.equippedWearables} slotId={WearableTypes.Body} />
                        <GotchiWearable  wearables={gotchi.equippedWearables} slotId={WearableTypes.RHand} />
                        <GotchiWearable  wearables={gotchi.equippedWearables} slotId={WearableTypes.Pet} />
                    </div>
                </div>
                <div className={classNames(classes.body, 'vertical')}>
                    <GotchiTraits traits={gotchi.numericTraits} currentTraits={gotchi.modifiedNumericTraits} />
                </div>
            </div>
        </div>
    );
}
