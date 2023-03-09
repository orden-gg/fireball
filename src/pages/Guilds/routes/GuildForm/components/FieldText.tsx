import classNames from 'classnames';
import { guildFormStyles } from '../styles';

interface FieldTextProps {
  type?: 'default' | 'warning' | 'error' | 'success';
  children: string | JSX.Element;
}

export function FieldText({ children, type }: FieldTextProps) {
  const classes = guildFormStyles();

  if (type === undefined) {
    return <></>;
  }

  return <p className={classNames(classes.formFieldText, type)}>{children}</p>;
}
