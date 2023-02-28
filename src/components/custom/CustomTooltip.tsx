import { useState } from 'react';
import { styled, Tooltip, tooltipClasses } from '@mui/material';

import { CustomTooltipProps } from 'shared/models';

const StyledTooltip = styled(({ className, ...props }: CustomTooltipProps) => {
  const [isTolltipOpened, setIsTolltipOpened] = useState<boolean>(false);

  const onTooltipClick = (): void => {
    setIsTolltipOpened(false);
  };

  const onToggleTooltip = (value: boolean): void => {
    setIsTolltipOpened(value);
  };

  return (
    <div
      onClick={() => onTooltipClick()}
      onMouseEnter={() => onToggleTooltip(true)}
      onMouseLeave={() => onToggleTooltip(false)}
    >
      <Tooltip {...props} open={isTolltipOpened} classes={{ popper: className }} />
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
  return <StyledTooltip {...props}>{props.children}</StyledTooltip>;
}
