import { createContext, useState } from 'react';

import { listingTypes } from 'data/types';

export const BaazaarContext = createContext({});

const defaultTraits = {
    'NRG': [],
    'AGG': [],
    'SPK': [],
    'BRN': [],
    'EYS': [],
    'EYC': []
};

const BaazaarContextProvider = (props) => {
    const [orderingTypes] = useState({
        priceASC: 'priceInWei-asc',
        priceDESC: 'priceInWei-desc',
        timeDESC: 'timeCreated-desc',
        timeASC: 'timeCreated-asc'
    });
    const [districtFilter, setDistrictFilter] = useState(0)
    const [sizeFilter, setSizeFilter] = useState('4');
    const [alphaFilter, setAlphaFilter] = useState('');
    const [kekFilter, setKekFilter] = useState('');
    const [fomoFilter, setFomoFilter] = useState('');
    const [fudFilter, setFudFilter] = useState('');
    const [sortingOrder, setSortingOrder] = useState(orderingTypes.timeDESC);
    const [selectedGoodsType, setSelectedGoodsType] = useState(listingTypes.aavegotchi);
    const [selectedListingType, setSelectedListingType] = useState(listingTypes.all);
    const [filteringType, setFilteringType] = useState('stats');
    const [name, setName] = useState(null);
    const [id, setId] = useState(null);
    const [exactMatch, setExactMatch] = useState(true);
    const [minBRS, setMinBRS] = useState(null);
    const [minKIN, setMinKIN] = useState(null);
    const [selectedTraits, setSelectedTraits] = useState('NRG');
    const [sliderRange, setSliderRange] = useState([-20, 120]);
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');
    const [rarity, setRarity] = useState('');
    const [stats, setStats] = useState(defaultTraits);
    const [collateral, setCollateral] = useState('all');

    const addStat = () => {
        setStats({
            ...stats,
            [selectedTraits]: [...stats[selectedTraits], sliderRange]
        });
    };

    const changeSingleStat = (trait, newStats) => {
        setStats({
            ...stats,
            [trait]: [newStats]
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

    const clearAllStats = () => {
        setStats(defaultTraits);
    };

    return (
        <BaazaarContext.Provider value={{
            selectedTraits,
            setSelectedTraits,
            stats,
            addStat,
            removeStat,
            clearAllStats,
            changeSingleStat,
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
            minKIN,
            setMinKIN,
            sliderRange,
            setSliderRange,
            orderingTypes,
            sortingOrder,
            setSortingOrder,
            selectedGoodsType,
            setSelectedGoodsType,
            selectedListingType,
            setSelectedListingType,
            priceFrom,
            setPriceFrom,
            priceTo,
            setPriceTo,
            rarity,
            setRarity,
            districtFilter,
            setDistrictFilter,
            sizeFilter,
            setSizeFilter,
            alphaFilter,
            setAlphaFilter,
            kekFilter,
            setKekFilter,
            fomoFilter,
            setFomoFilter,
            fudFilter,
            setFudFilter,
            collateral,
            setCollateral
        }}>
            { props.children }
        </BaazaarContext.Provider>
    )
}

export default BaazaarContextProvider;
