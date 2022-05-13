import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';

import CustomTooltip from 'components/custom/CustomTooltip';

import { InterfaceStyles } from '../styles';

export default function BasicButton({ settings, handleClick }) {
    const [isActive, setIsActive] = useState(settings.active);
    const classes = InterfaceStyles();

    const switchButtonState = () => {
        setIsActive(!isActive);
        handleClick(settings.type, !isActive);
    }

    useEffect(() => {
        // switchButtonState(settings.type, isActive);
    }, []);

    return (
        <CustomTooltip
            title={settings.tooltip}
            enterTouchDelay={0}
            placement='left'
        >
            <IconButton onClick={switchButtonState} className={classes.citadelInterfaceButton}>
                { settings.icons[isActive ? 0 : 1] }
            </IconButton>
        </CustomTooltip>
    );
}
