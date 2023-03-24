import { Button } from '@mui/material';

import classNames from 'classnames';

import { styles } from './styles';

interface ViewInAppButtonProps {
  link: string;
  children: string | JSX.Element;
  className?: string;
  target?: string;
}

export function ViewInAppButton({ target = '_blank', link, children, className }: ViewInAppButtonProps) {
  const classes = styles();

  return (
    <Button
      className={classNames(classes.button, className)}
      href={link}
      size='small'
      variant='contained'
      target={target}
      fullWidth
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </Button>
  );
}
