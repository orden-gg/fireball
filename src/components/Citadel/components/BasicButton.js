import { IconButton } from '@mui/material';
import { useState } from 'react';

import CustomTooltip from 'components/custom/CustomTooltip';

import { InterfaceStyles } from '../styles';

export default function BasicButton({ active, type, tooltip, icons, handleClick }) {
    const [isActive, setIsActive] = useState(active);
    const classes = InterfaceStyles();

    const switchButtonState = () => {
        setIsActive(!isActive);
        handleClick(type, !isActive);
    }

    return (
        <CustomTooltip
            title={tooltip}
            enterTouchDelay={0}
            placement='left'
        >
            <IconButton onClick={switchButtonState} className={classes.citadelInterfaceButton}>
                {icons[isActive ? 0 : 1]}
            </IconButton>
        </CustomTooltip>
    );
}
