import { Button, alpha, lighten } from '@mui/material';
import { styled } from '@mui/styles';

export const ButtonStyled = styled(Button)(({ theme }) => ({
  color: alpha(theme.palette.common.white, 0.8),
  borderColor: lighten(theme.palette.background.default, 0.25),
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    borderColor: lighten(theme.palette.background.default, 0.25),
    backgroundColor: alpha(theme.palette.background.default, 0.35)
  }
}));
