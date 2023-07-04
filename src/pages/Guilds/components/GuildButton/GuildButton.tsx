import { ButtonProps } from '@mui/material';

import { ButtonStyled } from './styles';

export function GuildButton(props: ButtonProps) {
  return <ButtonStyled {...props}>{props.children}</ButtonStyled>;
}
