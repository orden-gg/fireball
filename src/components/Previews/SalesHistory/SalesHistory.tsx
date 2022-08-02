import { ReactNode } from 'react';
import { CircularProgress } from '@mui/material';

import classNames from 'classnames';

import { styles } from './styles';

interface SalesHistoryProps {
    historyLoaded: boolean;
    children: ReactNode;
    className?: string;
}

export function SalesHistory({ historyLoaded, children, className }: SalesHistoryProps) {
    const classes = styles();

    return (
        <div className={classNames(classes.container, className)}>
            { historyLoaded ? (
                children
            ) : (
                <CircularProgress color='primary' size={28} />
            )}
        </div>
    );
}
