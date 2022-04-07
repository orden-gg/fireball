import React from 'react';
import { CircularProgress } from '@mui/material';

import classNames from 'classnames';

import { ContentInnerStyles } from './style';

export default function ContentInner({ children, dataLoading, offset }) {
    const classes = ContentInnerStyles();
    const contentOffset = offset || 168;

    return (
        <div className={classNames(classes.content, dataLoading && 'loading')} style={{ height: `calc(100vh - ${contentOffset}px)`, }}>
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
