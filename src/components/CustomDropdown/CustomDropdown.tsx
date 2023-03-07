import { useState } from 'react';
import { styled, Button, MenuItem, Menu, tooltipClasses } from '@mui/material';

import { CustomTooltipProps } from 'shared/models';

const StyledDropdown = styled(() => {
  // const [isDropdownOpened, setIsDropdownOpened] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const onDropdownClick = (): void => {
  //   setIsDropdownOpened(false);
  // };

  // const onToggleDropdown = (value: boolean): void => {
  //   setIsDropdownOpened(value);
  // };

  return (
    <div
    // onClick={() => onDropdownClick()}
    // onMouseEnter={() => onToggleDropdown(true)}
    // onMouseLeave={() => onToggleDropdown(false)}
    >
      <Button
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
})(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.secondary.dark
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.secondary.dark,
    '& p': {
      margin: 0
    },
    '& .highlight': {
      color: theme.palette.primary.main
    }
  }
}));

export function CustomTooltip(props: CustomTooltipProps) {
  return <StyledDropdown {...props}>{props.children}</StyledDropdown>;
}
