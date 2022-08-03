import classNames from 'classnames';

interface GotchiPreviewProps {
    children?: JSX.Element | JSX.Element[];
    className?: string;
}

export function GotchiPreview({ children, className }: GotchiPreviewProps) {
    return (
        <div className={classNames(className)}>
            {children}
        </div>
    );
}
