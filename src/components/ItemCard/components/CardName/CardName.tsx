import { Typography } from '@mui/material';

import classNames from 'classnames';

import { ItemUtils } from 'utils';

import { styles } from './styles';

interface CardNameProps {
  id?: number;
  children?: CustomAny;
  className?: string;
}

export function CardName({ id, children, className }: CardNameProps) {
  const classes = styles();

  const name: string = id ? ItemUtils.getNameById(id) : '';

  return (
    <Typography className={classNames(className, classes.name)}>
      <span>{children || name}</span>
    </Typography>
  );
}
