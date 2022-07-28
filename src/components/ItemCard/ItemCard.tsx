import classNames from 'classnames';
import { useContext, useEffect } from 'react';

import { CardContext, CardContextProvider } from './CardContext';

import { styles } from './styles';

interface CardItemProps {
    children: Array<JSX.Element> | JSX.Element;
    className?: string;
    id?: any;
    category?: any;
    type: string;
}

const CardInner = ({ children, id, category }): JSX.Element => {
    const { loadData } = useContext<any>(CardContext);

    useEffect(() => {
        if (id && category) {
            loadData(id, category);
        }
    }, []);

    return children;
};

export function ItemCard({ children, type, id, category, className }: CardItemProps) {
    const classes = styles();

    return (
        <CardContextProvider>
            <div className={classNames(type, classes.card, className)}>
                <CardInner id={id} category={category}>{children}</CardInner>
            </div>
        </CardContextProvider>
    );
}
