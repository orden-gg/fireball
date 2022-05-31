import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import classNames from 'classnames';

import styles from './styles';

export default function ActionPane({ children, dataLoading, className, width }) {
    const classes = styles();

    const [paneOpened, setPaneOpened] = useState(false);
    const paneSize = width ? width : '300';

    return (
        <div
            className={classNames(classes.pane, dataLoading && 'loading', paneOpened && 'opened')}
            style={{ width: `${paneSize}px`, right: `-${paneSize}px` }}
        >
            {!dataLoading ? (
                <>
                    {children}
                </>
            ) : (
                <div className={classes.placeholder}>
                    <CircularProgress color='primary' size={24} />
                </div>
            )}

            <Button
                className={classNames(classes.paneToggle, paneOpened && 'opened')}
                variant='contained'
                color='info'
                onClick={() => setPaneOpened(!paneOpened)}
            >
                <KeyboardArrowLeftIcon />
            </Button>
        </div>
    )
}
