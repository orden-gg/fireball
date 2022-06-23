import { useState } from 'react';
import { Button } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import classNames from 'classnames';

import { styles } from './styles';

interface ActionPaneProps {
    children: JSX.Element;
    dataLoading: boolean;
}

export function ActionPane({ children, dataLoading }: ActionPaneProps) {
    const classes = styles();

    const [paneOpened, setPaneOpened] = useState<boolean>(false);

    const paneSize: string = '300';

    return (
        <div
            className={classNames(classes.pane, dataLoading && 'loading', paneOpened && 'opened')}
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
