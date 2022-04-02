import React from 'react';
import { CircularProgress } from '@mui/material';

import classNames from 'classnames';

import { ContentInnerStyles } from './style';

export default function ContentInner({ children, dataLoading }) {
    const classes = ContentInnerStyles();

    return (
        <div className={classNames(classes.content, dataLoading && 'loading')}>
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
