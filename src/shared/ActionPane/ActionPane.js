import React from 'react';
import { CircularProgress } from '@mui/material';

import classNames from 'classnames';

import styles from './styles';

export default function ActionPane({ children, dataLoading, className, width }) {
    const classes = styles();

    return (
        <div
            className={classNames(classes.pane, dataLoading && 'loading')}
            style={{ width: `${width ? width : '300'}px` }}
        >
            {!dataLoading ? (
                <>
                    {children}
                </>
            ) : (
                <CircularProgress color='primary' size={32} />
            )}
        </div>
    )
}
