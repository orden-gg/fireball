import { CircularProgress } from '@mui/material';

import classNames from 'classnames';

import { ContentInnerStyles } from './style';

interface ContentInnerProps {
  children: JSX.Element | JSX.Element[];
  dataLoading: boolean;
  className?: string;
}

export function ContentInner({ children, dataLoading, className }: ContentInnerProps) {
  const classes = ContentInnerStyles();

  return (
    <div className={classNames(classes.content, dataLoading && 'loading', className)}>
      {!dataLoading ? <>{children}</> : <CircularProgress color='primary' />}
    </div>
  );
}
