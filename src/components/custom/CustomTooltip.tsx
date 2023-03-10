import { Tooltip, styled, tooltipClasses } from '@mui/material';

import { CustomTooltipProps } from 'shared/models';

const StyledTooltip = styled(({ className, ...props }: CustomTooltipProps) => {
  const onTooltipClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    event.stopPropagation();
  };

  return (
    <div onClick={(event) => onTooltipClick(event)} style={{ display: 'contents' }}>
      <Tooltip {...props} classes={{ popper: className }} />
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
