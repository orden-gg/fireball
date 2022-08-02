import { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import classNames from 'classnames';

import { GOTCHI_SIDES, WEARABLE_SLOTS } from 'shared/constants';
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

    const [view, setView] = useState<{ id: number, name: string}>({
        id: 0,
        name: GOTCHI_SIDES[0]
    });

    const changeView = (id: number): void => {
        const maxSideIndex: number = GOTCHI_SIDES.length - 1;

        let sideId: number = id;

        if (id > maxSideIndex) {
            sideId = 0;
        } else if (id < 0) {
            sideId = maxSideIndex;
        }

        setView({
            id: sideId,
            name: GOTCHI_SIDES[sideId]
        });
    };

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
                        <GotchiWearable id={gotchi.equippedWearables[3]} slot={WEARABLE_SLOTS[3]} />
                        <GotchiWearable id={gotchi.equippedWearables[1]} slot={WEARABLE_SLOTS[1]} />
                        <GotchiWearable id={gotchi.equippedWearables[4]} slot={WEARABLE_SLOTS[4]} />
                        <GotchiWearable id={gotchi.equippedWearables[7]} slot={WEARABLE_SLOTS[7]} />
                    </div>
                    <div className={classes.gotchiCenter}>
                        <GotchiSvg id={gotchi.id} size='100%' view={view.name} />

                        <GotchiLevel level={gotchi.level} experience={gotchi.experience} toNextLevel={gotchi.toNextLevel} />

                        <div>
                            <ArrowBackIcon onClick={() => changeView(view.id - 1)} />
                            <ArrowForwardIcon onClick={() => changeView(view.id + 1)}/>
                        </div>
                    </div>
                    <div className={classes.wearables}>
                        <GotchiWearable id={gotchi.equippedWearables[2]} slot={WEARABLE_SLOTS[2]} />
                        <GotchiWearable id={114} slot={WEARABLE_SLOTS[0]} />
                        <GotchiWearable id={gotchi.equippedWearables[5]} slot={WEARABLE_SLOTS[5]} />
                        <GotchiWearable id={gotchi.equippedWearables[6]} slot={WEARABLE_SLOTS[6]} />
                    </div>
                </div>
                <div className={classNames(classes.body, 'vertical')}>
                    <GotchiTraits traits={gotchi.numericTraits} currentTraits={gotchi.modifiedNumericTraits} />
                </div>
            </div>
        </div>
    );
}
