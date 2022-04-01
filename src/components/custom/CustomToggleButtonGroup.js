import React from 'react';
import { styled, ToggleButton, ToggleButtonGroup } from '@mui/material';

import CustomTooltip from './CustomTooltip';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    '& .MuiToggleButtonGroup-grouped': {
      margin: theme.spacing(0.5),
      border: 0,
      '&.Mui-disabled': {
        border: 0,
      },
      '&:not(:first-of-type)': {
        borderRadius: theme.shape.borderRadius,
      },
      '&:first-of-type': {
        borderRadius: theme.shape.borderRadius,
      },
      '&.MuiToggleButton-root': {
        textTransform: 'initial',
        padding: 0,
      },
      '& .tooltip-inner': {
          minWidth: 35,
          padding: '6px 8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
      }
    },
  }));

export default function CustomToggleButtonGroup({ list, ...props }) {
    return (
        <StyledToggleButtonGroup
            size='small'
            exclusive
            fullWidth
            {...props}
        >
            {
                list.map((item, index) => {
                    return <ToggleButton value={item.key} key={index} color='primary'>
                        <CustomTooltip
                            title={<span>{item.tooltip}</span>}
                            placement='top'
                            followCursor
                        >
                            {/* <span>{item.name}</span> */}
                            {/* {item.icon ? (
                                item.icon
                            ) : ( */}
                                <span className='tooltip-inner'>{item.icon ? item.icon : item.name}</span>
                            {/* )} */}
                        </CustomTooltip>
                    </ToggleButton>
                })
            }
        </StyledToggleButtonGroup>
    );
}
