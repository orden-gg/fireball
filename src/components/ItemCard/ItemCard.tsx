import classNames from 'classnames';
import { styles } from './styles';

interface CardItemProps {
    children: Array<JSX.Element>;
    className?: string;
    type: string;
}

export function ItemCard({ className, children, type }: CardItemProps) {
    const classes = styles();

    return (
        <div className={classNames(className, type, classes.card)}>
            {children}
        </div>
    )
}
