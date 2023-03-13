import { ToggleButton, ToggleButtonGroup, styled } from '@mui/material';

import { CustomTooltip } from 'components/custom/CustomTooltip';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius
    },
    '&.MuiToggleButton-root': {
      textTransform: 'initial',
      padding: 0
    },
    '& .tooltip-inner': {
      minWidth: 35,
      padding: '6px 8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }
}));

interface CustomToggleButtonGroupProps {
  list: CustomAny[];
  value: string;
  onChange: (event: React.MouseEvent<HTMLElement>, value: string) => void;
  ariaLabel: string;
  isDisabled: boolean;
}

export function CustomToggleButtonGroup({
  list,
  value,
  onChange,
  ariaLabel,
  isDisabled = false
}: CustomToggleButtonGroupProps) {
  return (
    <StyledToggleButtonGroup
      size='small'
      exclusive
      fullWidth
      value={value}
      onChange={onChange}
      aria-label={ariaLabel}
      disabled={isDisabled}
    >
      {list.map((item: CustomAny, index: number) => {
        return (
          <ToggleButton value={item.key} key={index} color='primary'>
            <CustomTooltip title={<span>{item.tooltip}</span>} placement='top' followCursor>
              <span className='tooltip-inner'>{item.icon ? item.icon : item.name}</span>
            </CustomTooltip>
          </ToggleButton>
        );
      })}
    </StyledToggleButtonGroup>
  );
}
