import { createContext, useState } from 'react';

import { ListingTypes } from 'shared/constants';

export const BaazaarContext = createContext({});

const defaultTraits: any = {
    'NRG': [],
    'AGG': [],
    'SPK': [],
    'BRN': [],
    'EYS': [],
    'EYC': []
};

export const BaazaarContextProvider = (props: any) => {
    const [orderingTypes] = useState<any>({
        priceASC: 'priceInWei-asc',
        priceDESC: 'priceInWei-desc',
        timeDESC: 'timeCreated-desc',
        timeASC: 'timeCreated-asc'
    });
    const [districtFilter, setDistrictFilter] = useState<number>(0);
    const [sizeFilter, setSizeFilter] = useState<string>('4');
    const [alphaFilter, setAlphaFilter] = useState<string>('');
    const [kekFilter, setKekFilter] = useState<string>('');
    const [fomoFilter, setFomoFilter] = useState<string>('');
    const [fudFilter, setFudFilter] = useState<string>('');
    const [sortingOrder, setSortingOrder] = useState<any>(orderingTypes.timeDESC);
    const [selectedGoodsType, setSelectedGoodsType] = useState<any>(ListingTypes.Aavegotchi);
    const [selectedListingType, setSelectedListingType] = useState<any>(ListingTypes.All);
    const [filteringType, setFilteringType] = useState<string>('stats');
    const [name, setName] = useState<any>(null);
    const [id, setId] = useState<any>(null);
    const [exactMatch, setExactMatch] = useState<any>(true);
    const [minBRS, setMinBRS] = useState<any>(null);
    const [minKIN, setMinKIN] = useState<any>(null);
    const [selectedTraits, setSelectedTraits] = useState<string>('NRG');
    const [sliderRange, setSliderRange] = useState<any>([-20, 120]);
    const [priceFrom, setPriceFrom] = useState<string>('');
    const [priceTo, setPriceTo] = useState<string>('');
    const [rarity, setRarity] = useState<string>('');
    const [stats, setStats] = useState(defaultTraits);
    const [collateral, setCollateral] = useState<string>('all');

    const addStat = (): void => {
        setStats({
            ...stats,
            [selectedTraits]: [...stats[selectedTraits], sliderRange]
        });
    };

    const changeSingleStat = (trait: any, newStats: any): void => {
        setStats({
            ...stats,
            [trait]: [newStats]
        });
    };

    const removeStat = (stat: any): void => {
        const oldStats: any[] = [...stats[stat.name]];

        oldStats.splice(stat.id, 1);

        setStats({
            ...stats,
            [stat.name]: oldStats
        });
    };

    const clearAllStats = (): void => {
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
    );
};
