import classNames from 'classnames';

import { ItemUtils } from 'utils';

import { styles } from './styles';

interface CardSlotProps {
    id?: number;
    children?: any;
    className?: string;
}

export function CardSlot({ id, children, className }: CardSlotProps) {
    const classes = styles();

    const slots = id ? ItemUtils.getSlotsById(id) : [];

    return (
        <div className={classNames(className, classes.slot)}>
            {
                children ||
                slots.map((slot, index) => (
                    <span key={index}>
                        {slot}
                        {(index + 1) < slots.length && <span className={classes.divider}>,</span>}
                    </span>
                ))
            }
        </div>
    );
}
