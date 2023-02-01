import { useState } from 'react';
import { IconButton } from '@mui/material';

import classNames from 'classnames';

import { CustomTooltip } from 'components/custom/CustomTooltip';

import { InterfaceStyles } from '../styles';

interface BasicButtonProps {
  active: boolean;
  type: string;
  tooltip: string;
  icon: JSX.Element;
  handleClick: (type: string, isActive: boolean) => void;
}

export function BasicButton({ active, type, tooltip, icon, handleClick }: BasicButtonProps) {
  const classes = InterfaceStyles();

  const [isActive, setIsActive] = useState(active);

  const switchButtonState = (isActive: boolean) => {
    setIsActive(isActive);
    handleClick(type, isActive);
  };

  return (
    <CustomTooltip title={tooltip} enterTouchDelay={0} placement='left'>
      <IconButton
        onClick={() => switchButtonState(!isActive)}
        className={classNames(classes.citadelInterfaceButton, isActive && 'active')}
      >
        {icon}
      </IconButton>
    </CustomTooltip>
  );
}
