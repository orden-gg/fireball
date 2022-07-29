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

    const slot = ItemUtils.getItemSlotById(id);

    return (
        <div className={classNames(className, classes.slot)}>
            [{children || (slot === 'right hand' ? 'r hand' : slot)}]
        </div>
    );
}
