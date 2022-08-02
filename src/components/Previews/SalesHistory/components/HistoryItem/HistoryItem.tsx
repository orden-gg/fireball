import { ReactNode } from 'react';

import classNames from 'classnames';

import { historyItemStyles } from './styles';

interface HistoryItemProps {
    children: ReactNode;
    className?: string;
}

export function HistoryItem({ children, className }: HistoryItemProps) {
    const classes = historyItemStyles();

    return <div className={classNames(classes.item, className)}>{children}</div>;
}
