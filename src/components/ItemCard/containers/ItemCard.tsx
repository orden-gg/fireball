import { useContext, useEffect } from 'react';

import classNames from 'classnames';

import { CardContext, CardContextProvider } from '../context/CardContext';
import { styles } from './styles';

interface CardInnerProps {
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

const CardInner = ({ children, id, category }: CardInnerProps): JSX.Element => {
  const { loadCardPrice } = useContext<any>(CardContext);

  useEffect(() => {
    if (id && category !== undefined) {
      loadCardPrice(id, category);
    }
  }, []);

  return <>{children}</>;
};

export function ItemCard({ children, type, id, category, className }: ItemCardProps) {
  const classes = styles();

  return (
    <CardContextProvider>
      <div className={classNames(type, classes.card, classes.cardVertical, className)}>
        <CardInner id={id} category={category}>
          {children}
        </CardInner>
      </div>
    </CardContextProvider>
  );
}
