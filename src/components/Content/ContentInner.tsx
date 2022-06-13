import { CircularProgress } from '@mui/material';

import classNames from 'classnames';

import { ContentInnerStyles } from './style';

interface ContentInnerProps {
    children: JSX.Element;
    dataLoading: boolean;
    offset?: number;
}

export function ContentInner({ children, dataLoading, offset }: ContentInnerProps) {
    const classes = ContentInnerStyles();

    const contentOffset = offset || 240;

    return (
        <div
            className={classNames(classes.content, dataLoading && 'loading')}
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
