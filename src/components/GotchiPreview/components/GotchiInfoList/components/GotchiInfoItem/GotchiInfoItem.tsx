import { CircularProgress } from '@mui/material';

import classNames from 'classnames';

import { gotchiInfoItemStyles } from './styles';

interface GotchiInfoItemProps {
  label: string;
  value: string | number;
  isLoaded?: boolean;
  title?: JSX.Element;
  className?: string;
}

export function GotchiInfoItem({ label, value, isLoaded = true, className }: GotchiInfoItemProps) {
  const classes = gotchiInfoItemStyles();

  return (
    <div className={classNames(classes.infoItem, className)}>
      <span className={classes.infoLabel}>{label}:</span>
      {isLoaded ? value : <CircularProgress size={16} color='inherit' />}
    </div>
  );
}
