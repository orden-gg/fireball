import classNames from 'classnames';

import { styles } from './styles';

interface CardSizeProps {
  children?: CustomAny;
  className?: string;
}

export function CardSize({ children, className }: CardSizeProps) {
  const classes = styles();

  return <div className={classNames(className, classes.size)}>{children}</div>;
}
