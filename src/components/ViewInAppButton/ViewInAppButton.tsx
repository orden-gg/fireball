import { Button } from '@mui/material';

import classNames from 'classnames';

import { styles } from './styles';

interface ViewInAppButtonProps {
    link: string;
    children: string;
    className?: string;
}

export function ViewInAppButton({ link, children, className }: ViewInAppButtonProps) {
    const classes = styles();

    return (
        <Button
            className={classNames(classes.button, className)}
            href={link}
            size='small'
            variant='contained'
            target='_blank'
            fullWidth
            onClick={(e) => e.stopPropagation()}
        >
            {children}
        </Button>
    );
}
