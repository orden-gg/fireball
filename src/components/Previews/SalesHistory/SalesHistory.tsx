import { CircularProgress } from '@mui/material';

import classNames from 'classnames';

import { styles } from './styles';

interface SalesHistoryProps {
  children: JSX.Element[];
  historyLoaded: boolean;
  className?: string;
}

export function SalesHistory({ historyLoaded, children, className }: SalesHistoryProps) {
  const classes = styles();

  return (
    <div className={classNames(classes.container, className)}>
      {historyLoaded ? children : <CircularProgress color='primary' size={28} />}
    </div>
  );
}
