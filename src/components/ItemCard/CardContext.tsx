import { createContext, useState } from 'react';

import { TheGraphApi } from 'api';

export const CardContext = createContext({});

export const CardContextProvider = (props: any) => {
    const [lastSold, setLastSold] = useState<any>({});
    const [current, setCurrent] = useState<any>({});
    const [lastDate, setLastDate] = useState<any>({});

    const loadData = (id: number | string, category: number | string): void => {

        TheGraphApi.getErc1155Price(id, true, category, 'timeLastPurchased', 'desc').then((response: any) => {
            setLastSold(response);

            if (response?.lastSale) {
                const date = new Date(response.lastSale * 1000).toJSON();

                setLastDate(date);
            }
        });

        TheGraphApi.getErc1155Price(id, false, category, 'priceInWei', 'asc').then((response: any) => {
            setCurrent(response);
        });
    }

    return (
        <CardContext.Provider value={{
            lastSold,
            current,
            lastDate,
            loadData
        }}>
            { props.children }
        </CardContext.Provider>
    );
};
