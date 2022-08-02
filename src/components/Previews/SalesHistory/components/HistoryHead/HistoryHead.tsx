import { ReactNode } from 'react';

import classNames from 'classnames';

import { historyHeadStyles } from './styles';

interface HistoryHeadProps {
    children: ReactNode;
    className?: string;
}

export function HistoryHead({ children, className }: HistoryHeadProps) {
    const classes = historyHeadStyles();

    return <div className={classNames(classes.head, className)}>
        {children}
    </div>;
}
