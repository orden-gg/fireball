import React, {createContext, useState} from 'react';
import { listingTypes } from "../data/types";

export const BaazaarContext = createContext({});

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
    const [selectedGoodsType, setSelectedGoodsType] = useState(listingTypes.aavegotchi)
    const [filteringType, setFilteringType] = useState('stats');
    const [name, setName] = useState(null);
    const [id, setId] = useState(null);
    const [exactMatch, setExactMatch] = useState(true);
    const [minBRS, setMinBRS] = useState(null);
    const [selectedTraits, setSelectedTraits] = useState('NRG');
    const [sliderRange, setSliderRange] = useState([0, 99]);
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');
    const [rarity, setRarity] = useState('');
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
            setSortingOrder,
            selectedGoodsType,
            setSelectedGoodsType,
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
            setFudFilter
        }}>
            { props.children }
        </BaazaarContext.Provider>
    )
}

export default BaazaarContextProvider;
