import classNames from 'classnames';

import { bodyStyles } from '../styles';

interface CardBodyProps {
    children: Array<JSX.Element>;
    className?: string;
}

export function CardBody({ children, className }: CardBodyProps) {
    const classes = bodyStyles();

    return (
        <div className={classNames(classes.body, className)}>
            {children}
        </div>
    )
}
