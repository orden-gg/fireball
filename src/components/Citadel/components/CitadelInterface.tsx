import classNames from 'classnames';

import { InterfaceStyles } from '../styles';

export function CitadelInterface({ children }: { children: JSX.Element[] }) {
  const classes = InterfaceStyles();

  return <div className={classNames(classes.citadelInterface, 'citadel-interface')}>{children}</div>;
}
