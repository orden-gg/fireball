import { gotchiIdentityTooltipStyles } from '../../GotchiIdentityTooltip/styles';

interface GotchiIdentityTooltipProps {
  children: JSX.Element | JSX.Element[];
}

export function IdentityTooltip({ children }: GotchiIdentityTooltipProps) {
  const classes = gotchiIdentityTooltipStyles();

  return <div className={classes.identityWrapper}>{children}</div>;
}
