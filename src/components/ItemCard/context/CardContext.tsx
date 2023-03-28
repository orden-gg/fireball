import { createContext, useState } from 'react';

import { TheGraphApi } from 'api';

export const CardContext = createContext({});

export const CardContextProvider = (props: CustomAny) => {
  const [lastSold, setLastSold] = useState<CustomAny>({});
  const [current, setCurrent] = useState<CustomAny>({});
  const [lastDate, setLastDate] = useState<CustomAny>({});

  const loadCardPrice = (id: number | string, category: number | string): void => {
    TheGraphApi.getErc1155Price(id, true, category, 'timeLastPurchased', 'desc').then((response: CustomAny) => {
      setLastSold(response);

      if (response?.lastSale) {
        const date = new Date(response.lastSale * 1000).toJSON();

        setLastDate(date);
      }
    });

    TheGraphApi.getErc1155Price(id, false, category, 'priceInWei', 'asc').then((response: CustomAny) => {
      setCurrent(response);
    });
  };

  return (
    <CardContext.Provider
      value={{
        lastSold,
        current,
        lastDate,
        loadCardPrice
      }}
    >
      {props.children}
    </CardContext.Provider>
  );
};
