import classNames from 'classnames';
import { innerStyles } from '../styles';

interface CardHeaderProps {
    children: Array<JSX.Element> | JSX.Element;
    className?: string;
}

export function CardHeader({ className, children }: CardHeaderProps) {
    const classes = innerStyles();

    return (
        <div className={classNames(className, classes.inner, classes.header)}>
            {children}
        </div>
    );
}
