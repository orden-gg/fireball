import React, {createContext, useState} from 'react';

export const BaazaarContext = createContext({});

const BaazaarContextProvider = (props) => {
    const [orderingTypes] = useState({
        priceASC: 'priceInWei-asc',
        priceDESC: 'priceInWei-desc',
        timeDESC: 'timeCreated-desc',
        timeASC: 'timeCreated-asc'
    });
    const [sortingOrder, setSortingOrder] = useState('timeCreated-desc');
    const [NRG, setNRG] = useState(null);
    const [AGG, setAGG] = useState(null);
    const [SPK, setSPK] = useState(null);
    const [BRN, setBRN] = useState(null);
    const [EYS, setEYS] = useState(null);
    const [EYC, setEYC] = useState(null);

    return (
        <BaazaarContext.Provider value={{
            NRG,
            setNRG,
            AGG,
            setAGG,
            SPK,
            setSPK,
            BRN,
            setBRN,
            EYS,
            setEYS,
            EYC,
            setEYC,
            orderingTypes,
            sortingOrder,
            setSortingOrder
        }}>
            { props.children }
        </BaazaarContext.Provider>
    )
}

export default BaazaarContextProvider;
