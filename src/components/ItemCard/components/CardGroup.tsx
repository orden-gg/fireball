import classNames from 'classnames';

import { innerStyles } from '../styles';

interface CardBodyProps {
    children: Array<JSX.Element> | JSX.Element;
    className?: string;
    name: string
}

export function CardGroup({ children, className, name }: CardBodyProps) {
    const classes = innerStyles();

    return (
        <div className={classNames(classes[name], className)}>
            {children}
        </div>
    );
}
