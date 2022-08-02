import { ReactNode } from 'react';

import classNames from 'classnames';

import { historyRowStyles } from './styles';

interface HistoryRowProps {
    children: ReactNode;
    className?: string;
}

export function HistoryRow({ children, className }: HistoryRowProps) {
    const classes = historyRowStyles();

    return <div className={classNames(classes.row, className)}>
        {children}
    </div>;
}
