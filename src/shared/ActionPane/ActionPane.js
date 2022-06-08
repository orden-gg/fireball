import { useState } from 'react';
import { Button } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import classNames from 'classnames';

import styles from './styles';

export default function ActionPane({ children, dataLoading, className, width }) {
    const classes = styles();

    const [paneOpened, setPaneOpened] = useState(false);
    const paneSize = width ? width : '300';

    return (
        <div
            className={classNames(classes.pane, className, dataLoading && 'loading', paneOpened && 'opened')}
            style={{ width: `${paneSize}px`, right: `-${paneSize}px` }}
        >
            {children}

            <Button
                className={classNames(classes.paneToggle, paneOpened && 'opened')}
                variant='contained'
                color='info'
                onClick={() => setPaneOpened(!paneOpened)}
                disabled={dataLoading}
            >
                <KeyboardArrowLeftIcon />
            </Button>
        </div>
    );
}
