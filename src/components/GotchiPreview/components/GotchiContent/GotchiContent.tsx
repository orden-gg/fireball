import { gotchiContentStyles } from './styles';

interface GotchiContentProps {
  children: JSX.Element | JSX.Element[];
}

export function GotchiContent({ children }: GotchiContentProps) {
  const classes = gotchiContentStyles();

  return <div className={classes.gotchiContent}>{children}</div>;
}
