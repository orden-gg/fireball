import classNames from 'classnames';
import { innerStyles } from '../styles';

interface CardFooterProps {
    children: Array<JSX.Element> | JSX.Element;
    className?: string;
}

export function CardFooter({ className, children }: CardFooterProps) {
    const classes = innerStyles();

    return (
        <div className={classNames(className, classes.inner, classes.footer)}>
            {children}
        </div>
    )
}
