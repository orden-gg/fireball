import classNames from 'classnames';

import { ItemUtils } from 'utils';
import { slotStyles } from '../styles';

interface CardSlotProps {
    id: number;
    className?: string;
}

export function CardSlot({ id, className }: CardSlotProps) {
    const classes = slotStyles();

    const slot = ItemUtils.getItemSlotById(id);

    if (slot.length != 0) {
        return (
            <div className={classNames(className, classes.slot)}>
                [{slot === 'right hand' ? 'r hand' : slot}]
            </div>
        )
    } else {
        return <></>;
    }
}
