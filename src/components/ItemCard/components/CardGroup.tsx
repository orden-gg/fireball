import classNames from 'classnames';

import { groupStyles } from '../styles';

interface CardGroupProps {
    children: Array<JSX.Element> | JSX.Element;
    className?: string;
    name: string
}

export function CardGroup({ children, className, name }: CardGroupProps) {
    const classes = groupStyles();

    return (
        <div className={classNames(classes[name], className)}>
            {children}
        </div>
    );
}
