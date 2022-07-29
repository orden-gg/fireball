import { useContext, useEffect } from 'react';

import classNames from 'classnames';

import { CardContext, CardContextProvider } from '../context/CardContext';

import { styles } from './styles';

interface ItemCardInnerProps {
    children: JSX.Element | JSX.Element[];
    id?: string | number;
    category?: string | number;
}
interface ItemCardProps {
    type: string;
    children: JSX.Element | JSX.Element[];
    id?: string | number;
    category?: string | number;
    className?: string;
}

const CardInner = ({ children, id, category }: ItemCardInnerProps): JSX.Element => {
    const { loadData } = useContext<any>(CardContext);

    useEffect(() => {
        if (id && category) {
            loadData(id, category);
        }
    }, []);

    return <>{children}</>;
};

export function ItemCardHorizontal({ children, type, id, category, className }: ItemCardProps) {
    const classes = styles();

    return (
        <CardContextProvider>
            <div className={classNames(type, classes.card, classes.cardHorizontal, className)}>
                <CardInner id={id} category={category}>{children}</CardInner>
            </div>
        </CardContextProvider>
    );
}
