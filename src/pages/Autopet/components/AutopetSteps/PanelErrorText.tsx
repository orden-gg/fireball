import { Typography } from '@mui/material';

import { tabStyles } from '../../styles';

interface PanelErrorTextProps {
  children: string;
  isShown: boolean;
}

export function PanelErrorText({ children, isShown }: PanelErrorTextProps) {
  const classes = tabStyles();

  return isShown ? <Typography className={classes.panelError}>{children}</Typography> : <></>;
}
