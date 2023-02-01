import { gotchiInfoListStyles } from './styles';

interface GotchiInfoListProps {
  children: JSX.Element | JSX.Element[];
}

export function GotchiInfoList({ children }: GotchiInfoListProps) {
  const classes = gotchiInfoListStyles();

  return <div className={classes.infoList}>{children}</div>;
}
