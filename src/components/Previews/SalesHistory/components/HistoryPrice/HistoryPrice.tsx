import { ReactNode } from 'react';

import classNames from 'classnames';

import { GhstTokenIcon } from 'components/Icons/Icons';

import { priceStyles } from './styles';

interface HistoryPriceeProps {
    children?: ReactNode;
    price?: number;
    className?: string;
}

export function HistoryPrice({ children, price, className }: HistoryPriceeProps) {
    const classes = priceStyles();

    return <div className={classNames(classes.price, className)}>
        {children || <>{price} <GhstTokenIcon height={15} width={15} /></>}
    </div>
}
