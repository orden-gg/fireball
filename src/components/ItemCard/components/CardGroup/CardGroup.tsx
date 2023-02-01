import classNames from 'classnames';

import { styles } from './styles';

interface CardGroupProps {
  name: string;
  children: JSX.Element | JSX.Element[];
  className?: string;
}

export function CardGroup({ children, className, name }: CardGroupProps) {
  const classes = styles();

  return <div className={classNames(classes[name], className)}>{children}</div>;
}
