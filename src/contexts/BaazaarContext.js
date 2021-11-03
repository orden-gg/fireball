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
    const [filteringType, setFilteringType] = useState('stats');
    const [name, setName] = useState(null);
    const [id, setId] = useState(null);
    const [exactMatch, setExactMatch] = useState(true);
    const [minBRS, setMinBRS] = useState(null);
    const [selectedTraits, setSelectedTraits] = useState('NRG');
    const [sliderRange, setSliderRange] = useState([0, 99]);
    const [stats, setStats] = useState({
        "NRG": [],
        "AGG": [],
        "SPK": [],
        "BRN": [],
        "EYS": [],
        "EYC": []
    });

    const addStat = (stat) => {
        setStats({
            ...stats,
            [selectedTraits]: [...stats[selectedTraits], sliderRange]
        });
    };

    const removeStat = (stat) => {
        let oldStats = [...stats[stat.name]];

        oldStats.splice(stat.id, 1);

        setStats({
            ...stats,
            [stat.name]: oldStats
        });
    };

    return (
        <BaazaarContext.Provider value={{
            selectedTraits,
            setSelectedTraits,
            stats,
            addStat,
            removeStat,
            filteringType,
            setFilteringType,
            name,
            setName,
            id,
            setId,
            exactMatch,
            setExactMatch,
            minBRS,
            setMinBRS,
            sliderRange,
            setSliderRange,
            orderingTypes,
            sortingOrder,
            setSortingOrder
        }}>
            { props.children }
        </BaazaarContext.Provider>
    )
}

export default BaazaarContextProvider;
