import classNames from 'classnames';

import { gotchiPreviewStyles } from './styles';

interface GotchiPreviewProps {
    children?: JSX.Element | JSX.Element[];
    className?: string;
}

export function GotchiPreview({ children, className }: GotchiPreviewProps) {
    const classes = gotchiPreviewStyles();

    return (
        <div className={classNames(classes.wrapper, className)}>
            {children}
        </div>
    );
}
