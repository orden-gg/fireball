import { Typography } from '@mui/material';

import classNames from 'classnames';

import { ItemUtils } from 'utils';

import { nameStyles } from '../styles';

interface CardNameProps {
    id?: number;
    children?: string;
    className?: string;
}

export function CardName({ id, children, className }: CardNameProps) {
    const classes = nameStyles();

    const name: string = ItemUtils.getItemNameById(id);

    return (
        <Typography className={classNames(className, classes.name)}>
            {children || name}
        </Typography>
    );
};
