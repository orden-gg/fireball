import { useState, useEffect, useContext } from 'react';

import { EthersApi, TheGraphApi } from 'api';
import { BaazaarContext } from 'contexts/BaazaarContext';
import useInterval from 'hooks/useInterval';
import { listingTypes } from 'data/types';
import { baazaarFilteringTypes } from 'data/types';

import { BaazaarBody } from './components/BaazaarBody';
import { BaazaarSortingBody } from './components/BaazaarSortingBody';
import { BaazaarSidebar } from './components/BaazaarSidebar/BaazaarSidebar';
import { getQueries } from './baazaarQueryBuilder';
import { styles } from './styles';
import { Backdrop, CircularProgress } from '@mui/material';

var paginationConfigs: any = {
        gotchiLimit: 60,
        limit: 24,
        noLimit: 1000
    },
    defaults = {
        defaultGoodsType: listingTypes.aavegotchi,
        defaultOrdering: 'timeCreated-desc'
    };

let localGoods: any[] = [];
let filteredLocalGoods: any[] = [];

// TODO component is to large to check every prop for types on initial migration. Should be checked afterwards
export function Baazaar() {
    const classes = styles();
    // server pagination
    const [goods, setGoods] = useState<any>([]);
    // local pagination
    const [selectedLocalGoods, setSelectedLocalGoods] = useState<any>([]);
    const [backdropIsOpen, showBackdrop] = useState<any>(false);
    // pagination
    const [page, setPage] = useState<any>(1);
    const [lastValidParams, setLastValidParams] = useState<any>({});
    const { filteringType, exactMatch, id, name, orderingTypes,
        sortingOrder, minBRS, minKIN, stats, selectedGoodsType, priceFrom,
        priceTo, districtFilter, sizeFilter, alphaFilter, kekFilter,
        fomoFilter, fudFilter, rarity, collateral, selectedListingType } = useContext<any>(BaazaarContext);
    // watch filters
    const [filtersTimer, setFiltersTimer] = useState<any>(0);
    const [userIsTyping, setUserTypingStatus] = useState<any>(false);

    const forceLoadItems = () => {
        const params: any = {
            skip: (page - 1) * paginationConfigs.limit,
            limit: paginationConfigs.limit
        };

        if (checkContainerVisibility([listingTypes.aavegotchi])) {
            params['limit'] = paginationConfigs.noLimit;
            setLastValidParams(params);
            getAllBaazaarItems(params);
        }  else if (checkContainerVisibility([listingTypes.realm])) {
            params['limit'] = paginationConfigs.noLimit;
            setLastValidParams(params);
            getAllRealmParcels();
        } else if (checkContainerVisibility([
            listingTypes.closedPortal,
            listingTypes.wearable,
            listingTypes.consumable,
            listingTypes.tickets
        ])) {
            params.from = priceFrom;
            params.to = priceTo;
            params.type = selectedGoodsType;
            params.ordering = sortingOrder;
            params.rarity = rarity;
            params['limit'] = paginationConfigs.gotchiLimit;
            setLastValidParams(params);
            getBaazaarItems(params);
        } else if (checkContainerVisibility([
            listingTypes.activity,
            listingTypes.listing,
            listingTypes.sold,
            listingTypes.purchased
        ])) {
            getSalesData();
        }
    };

    const getSalesData = () => {
        showBackdrop(true);
        TheGraphApi.getJoinedData(getQueries(selectedGoodsType, selectedListingType)).then((response) => {
            let cacheData: any[] = [];
            response.forEach( item => {
                cacheData = [...cacheData, ...(item.data.erc721Listings || item.data.erc1155Purchases || item.data.erc1155Listings)];
            });
            filteredLocalGoods = cacheData;
            sortAllActivityItems();
            getShownActivityItems();
            showBackdrop(false);
        }).catch(() => {
            showBackdrop(false);
        });
    };

    const getShownActivityItems = (newPage?: any) => {
        const itemsStart = ((newPage || page) - 1) * paginationConfigs.gotchiLimit;
        const newSelectedGoods = filteredLocalGoods.slice(itemsStart, itemsStart + paginationConfigs.gotchiLimit);
        setSelectedLocalGoods(newSelectedGoods);
    };

    const sortAllActivityItems = () => {
        filteredLocalGoods.sort((a, b) => {
            if ([
                listingTypes.activity,
                listingTypes.sold,
                listingTypes.purchased
            ].indexOf(selectedGoodsType) !== -1) {
                return parseInt(b.timePurchased || b.timeLastPurchased) - parseInt(a.timePurchased || a.timeLastPurchased);
            } else {
                return parseInt(b.timeCreated) - parseInt(a.timeCreated);
            }
        });
    };

    const getGraphQueryString = (params) => {
        return `{category: ${params.type ? params.type.split('-')[0] : defaults.defaultGoodsType.split('-')[0]} (
            first: ${paginationConfigs.limit},
            skip: ${params.skip},
            orderBy: ${params.ordering ? params.ordering.split('-')[0] : defaults.defaultOrdering[0]},
            orderDirection: ${params.ordering ? params.ordering.split('-')[1] : defaults.defaultOrdering[1]},
            where: {
                cancelled: false,
                ${params.from ? `priceInWei_gte: "${EthersApi.toWei(params.from)}",` : ''}
                priceInWei_lt: ${params.to ? `"${EthersApi.toWei(params.to)}"` : '"10000000000000000000000000"'},
                ${'category: ' + (params.type ? params.type.split('-')[1] : defaults.defaultGoodsType.split('-')[1]) + ','}
                ${
                    (params.type ? params.type.split('-')[0] : defaults.defaultGoodsType.split('-')[0]) === 'erc1155Listings' ?
                        `sold: false,
                        ${params.rarity ? 'rarityLevel: ' + params.rarity : ''}` :
                        'timePurchased: "0"'
                }
            })
            {
                id,
                priceInWei,
                category,
                timeCreated,
                seller,
                ${
                    (params.type ? params.type.split('-')[0] : defaults.defaultGoodsType.split('-')[0]) === 'erc1155Listings' ?
                        `quantity,
                        rarityLevel,
                        erc1155TypeId,
                        erc1155TokenAddress` :
                        `tokenId,
                        timePurchased,
                        hauntId,
                        gotchi`
                }
            }
        }`;
    };

    const getAllItemsQueryString = (params, skip, type, order) => {
        return `{category: ${params.type ? params.type.split('-')[0] : defaults.defaultGoodsType.split('-')[0]} (
            first: ${paginationConfigs.noLimit},
            skip: ${skip},
            orderBy: ${defaults.defaultOrdering.split('-')[0]},
            orderDirection: ${order},
            where: {
                cancelled: false,
                ${params.from ? `priceInWei_gte: "${EthersApi.toWei(params.from)}",` : ''}
                priceInWei_lt: ${params.to ? `"${EthersApi.toWei(params.to)}"` : '"10000000000000000000000000"'},
                ${'category: ' + (type ? type.split('-')[1] : defaults.defaultGoodsType.split('-')[1]) + ','}
                ${
                    (params.type ? params.type.split('-')[0] : defaults.defaultGoodsType.split('-')[0]) === 'erc1155Listings' ?
                        `sold: false,
                        ${params.rarity ? 'rarityLevel: ' + params.rarity : ''}` :
                        'timePurchased: "0"'
                }
            })
            {
                id,
                priceInWei,
                tokenId,
                timeCreated,
                hauntId,
                gotchi {
                    id,
                    gotchiId,
                    owner {
                        id
                    },
                    hauntId,
                    name,
                    numericTraits,
                    modifiedNumericTraits
                    withSetsNumericTraits,
                    equippedWearables,
                    collateral,
                    kinship,
                    experience,
                    toNextLevel,
                    level,
                    baseRarityScore,
                    modifiedRarityScore
                    withSetsRarityScore
                    possibleSets
                    equippedSetID
                    equippedSetName
                    usedSkillPoints
                    listings(where:{cancelled: false, timePurchased: 0}) {
                        id
                        priceInWei
                    }
                    historicalPrices
                },
                portal {
                    id,
                    gotchiId,
                    options {
                        id,
                        owner {
                            id
                        },
                        portal,
                        numericTraits,
                        collateralType,
                        baseRarityScore
                    }
                }
            }
        }`;
    };

    const getBaazaarItems = (params) => {
        showBackdrop(true);
        TheGraphApi.getData(getGraphQueryString(params)).then((response) => {
            setGoods(response.data.category);
            showBackdrop(false);
        }).catch(() => {
            showBackdrop(false);
        });
    };

    const makeQueriesForCategory = (params, type) => {
        return [
            getAllItemsQueryString(params, 0, type, 'asc'),
            getAllItemsQueryString(params, 1000, type, 'asc'),
            getAllItemsQueryString(params, 2000, type, 'asc'),
            getAllItemsQueryString(params, 3000, type, 'asc'),
            getAllItemsQueryString(params, 4000, type, 'asc'),
            getAllItemsQueryString(params, 5000, type, 'asc'),
            getAllItemsQueryString(params, 0, type, 'desc'),
            getAllItemsQueryString(params, 1000, type, 'desc'),
            getAllItemsQueryString(params, 2000, type, 'desc'),
            getAllItemsQueryString(params, 3000, type, 'desc'),
            getAllItemsQueryString(params, 4000, type, 'desc'),
            getAllItemsQueryString(params, 5000, type, 'desc')
        ];
    };

    const processResponse = (response) => {
        const processedItems: any[] = [];
        const items: any[] = [];

        // combine response data
        response.forEach((item) => {
            if (item.data.category.length) {
                item.data.category.forEach((categoryItem) => {
                    if (categoryItem.gotchi) {
                        if (processedItems.indexOf(categoryItem.tokenId) === -1) {
                            processedItems.push(categoryItem.tokenId);
                            items.push(categoryItem);
                        }
                    } else {
                        if (processedItems.indexOf(categoryItem.tokenId) === -1) {
                            processedItems.push(categoryItem.tokenId);
                            categoryItem.portal.options.forEach((option) => {
                                items.push({
                                    ...categoryItem,
                                    gotchi: {
                                        ...option,
                                        tempId: option.id,
                                        collateral: option.collateralType,
                                        hauntId: categoryItem.hauntId,
                                        id: option.id.split('-')[0],
                                        kinship: '50',
                                        modifiedNumericTraits: option.numericTraits,
                                        level: '1',
                                        equippedWearables: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                                    }
                                });
                            });
                        }
                    }
                });
            }
        });

        return items;
    };

    const getAllBaazaarItems = (params) => {
        showBackdrop(true);
        localGoods = [];
        TheGraphApi.getJoinedData(makeQueriesForCategory(params, listingTypes.aavegotchi)).then((response) => {
            localGoods = [...localGoods, ...processResponse(response)];
            TheGraphApi.getJoinedData(makeQueriesForCategory(params, listingTypes.openedPortal)).then((response) => {
                localGoods = [...localGoods, ...processResponse(response)];
                // start render
                filterLocalGotchis();
                sortLocalGotchis();
                getShownItems();
                showBackdrop(false);
            }).catch(() => {
                showBackdrop(false);
            });
        }).catch(() => {
            showBackdrop(false);
        });
    };

    const getAllRealmParcels = () => {
        showBackdrop(true);
        localGoods = [];
        TheGraphApi.getAllListedParcels().then((response) => {
            // start render
            localGoods = [...localGoods, ...response];
            filterLocalRealms();
            sortLocalGotchis();
            getShownItems();
            showBackdrop(false);
        }).catch(() => {
            showBackdrop(false);
        });
    };

    const onNextPageClick = () => {
        setPage(page + 1);
        onPaginationClick(page + 1);
    };

    const onPrevPageClick = () => {
        setPage(page - 1);
        onPaginationClick(page - 1);
    };

    const onLocalNextPageClick = () => {
        setPage(page + 1);
        onLocalPaginationClick(page + 1);
    };

    const onLocalPrevPageClick = () => {
        setPage(page - 1);
        onLocalPaginationClick(page - 1);
    };

    const onPaginationClick = (newPage) => {
        const params = {
            ...lastValidParams,
            skip: (newPage - 1) * paginationConfigs.limit,
            limit: paginationConfigs.limit
        };

        setLastValidParams(params);
        getBaazaarItems(params);
    };

    const onLocalPaginationClick = (newPage) => {
        getShownItems(newPage);
    };

    const sortLocalGotchis = () => {
        filteredLocalGoods.sort((a, b) => {
            if (sortingOrder === orderingTypes.priceASC) {
                return EthersApi.fromWei(a.priceInWei) - EthersApi.fromWei(b.priceInWei);
            } else if (sortingOrder === orderingTypes.priceDESC) {
                return EthersApi.fromWei(b.priceInWei) - EthersApi.fromWei(a.priceInWei);
            } else if (sortingOrder === orderingTypes.timeASC) {
                return parseInt(a.timeCreated) - parseInt(b.timeCreated);
            } else {
                return parseInt(b.timeCreated) - parseInt(a.timeCreated);
            }
        });
    };

    const filterLocalGotchis = () => {
        const filtersMap = ['NRG', 'AGG', 'SPK', 'BRN', 'EYS', 'EYC'];

        const filterSingleGotchi = (item) => {
            const gotchi = item.gotchi;
            const gotchiTraits = gotchi.numericTraits;
            let hasDifference = false;

            if ((!priceFrom ? false : EthersApi.fromWei(item.priceInWei) < parseFloat(priceFrom)) || (!priceTo ? false : EthersApi.fromWei(item.priceInWei) > parseFloat(priceTo))) {
                return false;
            }

            if (collateral !== 'all' && item.gotchi.collateral.toLowerCase() !== collateral.toLowerCase()) {
                return false;
            }

            if (filteringType === baazaarFilteringTypes.name) {
                if (!gotchi.name) return false;
                if (!name) return true;

                if (exactMatch) {
                    return gotchi.name.toLowerCase() === name.toLowerCase();
                } else {
                    return gotchi.name.toLowerCase().split(name.toLowerCase()).length > 1;
                }
            } else if (filteringType === baazaarFilteringTypes.id) {
                if (!id) return true;

                if (exactMatch) {
                    return gotchi.id === id;
                } else {
                    return gotchi.id.split(id).length > 1;
                }
            } else if (filteringType === baazaarFilteringTypes.stats) {
                if (parseInt(gotchi.baseRarityScore) <= parseInt(minBRS) || parseInt(gotchi.kinship) <= parseInt(minKIN)) {
                    return false;
                }
                filtersMap.forEach((traitName, index) => {
                    if (!hasDifference) {
                        let thisTraitHasMatch = false;

                        stats[traitName].forEach((traitsRange) => {
                            if (!thisTraitHasMatch) {
                                thisTraitHasMatch = traitsRange[0] <= gotchiTraits[index] && traitsRange[1] >= gotchiTraits[index];
                            }
                        });

                        if (!thisTraitHasMatch && stats[traitName].length) {
                            hasDifference = true;
                        }
                    }
                });
            } else {
                return true;
            }

            return !hasDifference;
        };

        filteredLocalGoods = localGoods.filter((item) => {
            return filterSingleGotchi(item);
        });
    };

    const filterLocalRealms = () => {
        const filterSingleRealm = (parcelItem) => {
            const item = parcelItem.parcel;

            if ((!priceFrom ? false : EthersApi.fromWei(parcelItem.priceInWei) < parseFloat(priceFrom)) || (!priceTo ? false : EthersApi.fromWei(parcelItem.priceInWei) > parseFloat(priceTo))) {
                return false;
            }

            return  (districtFilter === 0 ? true : (districtFilter + '' === item.district)) &&
                (sizeFilter === '4' ? true : ((item.size === '3' || item.size === '2') && sizeFilter === '2' ? true : item.size === sizeFilter)) &&
                ((parseInt(alphaFilter) === 0 || alphaFilter === '' || alphaFilter === null) ? true : parseInt(item.alphaBoost) >= parseInt(alphaFilter)) &&
                ((parseInt(fudFilter) === 0 || fudFilter === '' || fudFilter === null) ? true : parseInt(item.fudBoost) >= parseInt(fudFilter)) &&
                ((parseInt(kekFilter) === 0 || kekFilter === '' || kekFilter === null) ? true : parseInt(item.kekBoost) >= parseInt(kekFilter)) &&
                ((parseInt(fomoFilter) === 0 || fomoFilter === '' || fomoFilter === null) ? true : parseInt(item.fomoBoost) >= parseInt(fomoFilter));
        };

        filteredLocalGoods = localGoods.filter((item) => {
            return filterSingleRealm(item);
        });
    };

    const getShownItems = (newPage?: any) => {
        const itemsStart = ((newPage || page) - 1) * paginationConfigs.gotchiLimit;
        const newSelectedGoods = filteredLocalGoods.slice(itemsStart, itemsStart + paginationConfigs.gotchiLimit);
        setSelectedLocalGoods(newSelectedGoods);
    };

    const handleFindGotchiClick = () => {
        setSelectedLocalGoods([]);
        filterLocalGotchis();
        sortLocalGotchis();
        setPage(1);
        getShownItems();
    };

    const handleFindRealmClick = () => {
        setSelectedLocalGoods([]);
        filterLocalRealms();
        sortLocalGotchis();
        setPage(1);
        getShownItems();
    };

    const runInstantFiltering = () => {
        if (!properItemsForFiltering()) {
            return false;
        }

        if (isLocalFilteringFlow()) {
            if (selectedGoodsType === listingTypes.aavegotchi) {
                handleFindGotchiClick();
            } else {
                handleFindRealmClick();
            }
        } else {
            forceLoadItems();
        }
    };

    const runFilterWatcher = () => {
        setFiltersTimer(1000);
        setUserTypingStatus(true);
    };

    const properItemsForFiltering = () => {
        if (!isLocalFilteringFlow()) return true;
        if (!localGoods.length) return false;

        const firstItemFromLocalGoods = localGoods[0];
        const localGoodsHasGotchiItem = firstItemFromLocalGoods.gotchi;

        return (selectedGoodsType === listingTypes.aavegotchi && localGoodsHasGotchiItem) ||
            (selectedGoodsType === listingTypes.realm && !localGoodsHasGotchiItem);
    };

    const isLocalFilteringFlow = () => {
        if ([listingTypes.aavegotchi, listingTypes.realm].indexOf(selectedGoodsType) !== -1) {
            return true;
        }
    };

    const checkContainerVisibility = (visibleContainers) => {
        return visibleContainers.indexOf(selectedGoodsType) !== -1;
    };

    useInterval(() => {
        const cachedTimerValue = filtersTimer - 250;

        if (userIsTyping && filtersTimer === 0) {
            setUserTypingStatus(false);
            runInstantFiltering();
        } else {
            setFiltersTimer(cachedTimerValue <= 0 ? 0 : cachedTimerValue);
        }
    }, 250);

    useEffect(() => {
        runInstantFiltering();
    }, [sortingOrder, rarity]);

    useEffect(() => {
        if ([
            listingTypes.activity,
            listingTypes.listing,
            listingTypes.sold,
            listingTypes.purchased
        ].indexOf(selectedGoodsType) !== -1) {
            paginationConfigs.gotchiLimit = 240;
        } else {
            paginationConfigs.gotchiLimit = 60;
        }

        setGoods([]);
        setSelectedLocalGoods([]);
        forceLoadItems();
    }, [selectedGoodsType, selectedListingType]);

    return (
        <div className={classes.baazaar}>
            <BaazaarSidebar
                setPage={setPage}
                runFilterWatcher={runFilterWatcher}
                runInstantFiltering={runInstantFiltering}
                setSelectedLocalGoods={setSelectedLocalGoods}
            />
            {
                checkContainerVisibility([
                    listingTypes.closedPortal,
                    listingTypes.wearable,
                    listingTypes.consumable,
                    listingTypes.tickets
                ]) ?
                    <BaazaarBody
                        goods={goods}
                        page={page}
                        limit={paginationConfigs.limit}
                        onNextPageClick={onNextPageClick}
                        onPrevPageClick={onPrevPageClick}
                    />
                    : <BaazaarSortingBody
                        goods={selectedLocalGoods}
                        page={page}
                        limit={paginationConfigs.gotchiLimit}
                        onNextPageClick={onLocalNextPageClick}
                        onPrevPageClick={onLocalPrevPageClick}
                    />
            }

            <Backdrop classes={{ root: classes.backdrop }} open={backdropIsOpen}>
                <CircularProgress color='primary' />
            </Backdrop>
        </div>
    );
}
