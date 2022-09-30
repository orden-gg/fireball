import { CircularProgress } from '@mui/material';

import classNames from 'classnames';

import { ContentInnerStyles } from './style';

interface ContentInnerProps {
    children: JSX.Element | JSX.Element[];
    dataLoading: boolean;
    offset?: number;
    className?: string;
}

export function ContentInner({ children, dataLoading, offset, className }: ContentInnerProps) {
    const classes = ContentInnerStyles();

    const contentOffset = offset || 218;

    return (
        <div
            className={classNames(classes.content, dataLoading && 'loading', className)}
            style={{ height: `calc(100vh - ${contentOffset}px)` }}
        >
            {!dataLoading ? (
                <>
                    {children}
                </>
            ) : (
                <CircularProgress color='primary' />
            )}
        </div>
    );
}
