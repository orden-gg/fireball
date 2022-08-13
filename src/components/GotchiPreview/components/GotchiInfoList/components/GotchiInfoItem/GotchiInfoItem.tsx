
import classNames from 'classnames';

import { gotchiInfoItemStyles } from './styles';

interface GotchiInfoItemProps {
    label: string;
    value: string | number;
    className?: string;
}

export function GotchiInfoItem({ label, value, className }: GotchiInfoItemProps) {
    const classes = gotchiInfoItemStyles();

    return <div className={classNames(classes.infoItem, className)}>
        <span className={classes.infoLabel}>{label}:</span>
        {value}
    </div>;
}
