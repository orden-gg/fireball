import { useState } from 'react';
import { IconButton } from '@mui/material';

import classNames from 'classnames';

import CustomTooltip from 'components/custom/CustomTooltip';

import { InterfaceStyles } from '../styles';

export default function BasicButton({ active, type, tooltip, icons, handleClick }) {
    const classes = InterfaceStyles();

    const [isActive, setIsActive] = useState(active);

    const switchButtonState = isActive => {
        setIsActive(isActive);
        handleClick(type, isActive);
    };

    return (
        <CustomTooltip
            title={tooltip}
            enterTouchDelay={0}
            placement='left'
        >
            <IconButton
                onClick={() => switchButtonState(!isActive)}
                className={classNames(classes.citadelInterfaceButton, isActive && 'active')}
            >
                {icons[isActive ? 0 : 1]}
            </IconButton>
        </CustomTooltip>
    );
}
