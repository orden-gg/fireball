import React, { useState, useEffect, useContext } from 'react';
import { Grid, Backdrop, CircularProgress } from "@mui/material";
import useStyles from "./style";
import thegraph from "../../api/thegraph";
import BaazaarBody from "./components/BaazaarBody/BaazaarBody";
import BaazaarSortingBody from './components/BaazaarSortingBody/BaazaarSortingBody';
import BaazaarSidebar from "./components/BaazaarSidebar/BaazaarSidebar";
import { BaazaarContext } from "../../contexts/BaazaarContext";
import { listingTypes } from "../../data/types";
import Web3 from "web3";
import { baazaarFilteringTypes } from '../../data/types';

const web3 = new Web3();

var paginationConfigs = {
        gotchiLimit: 60,
        limit: 24,
        noLimit: 1000
    },
    defaults = {
        defaultGoodsType: listingTypes.aavegotchi,
        defaultOrdering: 'timeCreated-desc'
    };

let localGoods = [],
    filteredLocalGoods = [];

export default function Baazaar() {
    const classes = useStyles();
    const [selectedGoodsType, setSelectedGoodsType] = useState(defaults.defaultGoodsType);
    const [resultsForType, setResultsForType] = useState(defaults.defaultGoodsType);
    // server pagination
    const [goods, setGoods] = useState([]);
    // local pagination
    const [selectedLocalGoods, setSelectedLocalGoods] = useState([]);
    const [backdropIsOpen, showBackdrop] = useState(false);
    // pagination
    const [page, setPage] = useState(1);
    const [lastValidParams, setLastValidParams] = useState({});
    const [paginationIsVisible, setPaginationToVisible] = useState(true);
    const {filteringType, exactMatch, id, name, orderingTypes, sortingOrder, minBRS, stats} = useContext(BaazaarContext);

    const onLoadBaazaarItemsClick = (params) => {
        const validParams = validateParams(params);
        let paramsWithLimit;

        setGoods([]);
        setSelectedLocalGoods([]);
        setResultsForType(selectedGoodsType);

        if (validParams) {
            if (validParams.type === listingTypes.aavegotchi || validParams.type === listingTypes.openedPortal) {
                setPaginationToVisible(false);

                paramsWithLimit = {
                    ...validParams,
                    skip: 0,
                    limit: paginationConfigs.noLimit
                };

                getAllBaazaarItems(paramsWithLimit);
            } else {
                paramsWithLimit = {
                    ...validParams,
                    skip: 0,
                    limit: paginationConfigs.limit
                };

                setPaginationToVisible(true);
                setPage(1);
                setLastValidParams(paramsWithLimit);
                getBaazaarItems(paramsWithLimit);
            }
        }
    };

    const validateParams = (params) => {
        let newParams = {};

        for (let key in params) {
            if (params.hasOwnProperty(key)) {
                if (params[key] || params[key] === 0) {
                    newParams[key] = params[key];
                }
            }
        }

        return newParams;
    };

    const getGraphQueryString = (params) => {
        return `{category: ${params.type ? params.type.split('-')[0] : defaults.defaultGoodsType.split('-')[0]} (
            first: ${paginationConfigs.limit},
            skip: ${params.skip},
            orderBy: ${params.ordering ? params.ordering.split('-')[0] : defaults.defaultOrdering[0]},
            orderDirection: ${params.ordering ? params.ordering.split('-')[1] : defaults.defaultOrdering[1]},
            where: {
                cancelled: false,
                ${params.from ? `priceInWei_gte: "${web3.utils.toWei(params.from)}",` : ""}
                priceInWei_lt: ${params.to ? `"${web3.utils.toWei(params.to)}"` : `"10000000000000000000000000"`},
                ${'category: ' + (params.type ? params.type.split('-')[1] : defaults.defaultGoodsType.split('-')[1]) + ','}
                ${
                    (params.type ? params.type.split('-')[0] : defaults.defaultGoodsType.split('-')[0]) === 'erc1155Listings' ?
                        `sold: false,
                        ${params.rarity ? 'rarityLevel: ' + params.rarity : ''}` :
                        `timePurchased: "0"`
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
        }`
    };

    const getAllItemsQueryString = (params, skip, type, order) => {
        return `{category: ${params.type ? params.type.split('-')[0] : defaults.defaultGoodsType.split('-')[0]} (
            first: ${paginationConfigs.noLimit},
            skip: ${skip},
            orderBy: ${defaults.defaultOrdering.split('-')[0]},
            orderDirection: ${order},
            where: {
                cancelled: false,
                ${params.from ? `priceInWei_gte: "${web3.utils.toWei(params.from)}",` : ""}
                priceInWei_lt: ${params.to ? `"${web3.utils.toWei(params.to)}"` : `"10000000000000000000000000"`},
                ${'category: ' + (type ? type.split('-')[1] : defaults.defaultGoodsType.split('-')[1]) + ','}
                ${
                    (params.type ? params.type.split('-')[0] : defaults.defaultGoodsType.split('-')[0]) === 'erc1155Listings' ?
                        `sold: false,
                        ${params.rarity ? 'rarityLevel: ' + params.rarity : ''}` :
                        `timePurchased: "0"`
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
                    withSetsNumericTraits,
                    equippedWearables,
                    collateral,
                    kinship,
                    experience,
                    toNextLevel,
                    level,
                    baseRarityScore,
                    withSetsRarityScore
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
        }`
    };

    const getBaazaarItems = (params) => {
        showBackdrop(true);
        thegraph.getData(getGraphQueryString(params)).then((response) => {
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

    const processResponse = (params, response) => {
        let processedItems = [],
            items = [];

        // combine response data
        response.forEach((item) => {
            item.data.category.length && item.data.category.forEach((categoryItem) => {
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
                                    withSetsNumericTraits: option.numericTraits,
                                    level: '1',
                                    equippedWearables: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                                }
                            });
                        });
                    }
                }
            });
        });

        localGoods = [...localGoods, ...items];
    };

    const getAllBaazaarItems = (params) => {
        showBackdrop(true);
        localGoods = [];
        thegraph.getJoinedData(makeQueriesForCategory(params, listingTypes.aavegotchi)).then((response) => {
            processResponse(params, response);
            thegraph.getJoinedData(makeQueriesForCategory(params, listingTypes.openedPortal)).then((response) => {
                processResponse(params, response);
                // start render
                filterLocalGoods();
                sortLocalGoods();
                getShownItems();
                showBackdrop(false);
            }).catch(() => {
                showBackdrop(false);
            });
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

    const sortLocalGoods = () => {
        filteredLocalGoods.sort((a, b) => {
            if (sortingOrder === orderingTypes.priceASC) {
                return web3.utils.fromWei(a.priceInWei) - web3.utils.fromWei(b.priceInWei);
            } else if (sortingOrder === orderingTypes.priceDESC) {
                return web3.utils.fromWei(b.priceInWei) - web3.utils.fromWei(a.priceInWei);
            } else if (sortingOrder === orderingTypes.timeASC) {
                return parseInt(a.timeCreated) - parseInt(b.timeCreated);
            } else {
                return parseInt(b.timeCreated) - parseInt(a.timeCreated);
            }
        });
    };

    const filterLocalGoods = () => {
        const filtersMap = ["NRG", "AGG", "SPK", "BRN", "EYS", "EYC"];

        const filterSingleGotchi = (item) => {
            const gotchiTraits = item.numericTraits;
            let hasDifference = false;

            if (filteringType === baazaarFilteringTypes.name) {
                if (!item.name) return false;
                if (!name) return true;

                if (exactMatch) {
                    return item.name.toLowerCase() === name.toLowerCase();
                } else {
                    return item.name.toLowerCase().split(name.toLowerCase()).length > 1;
                }
            } else if (filteringType === baazaarFilteringTypes.id) {
                if (!id) return true;

                if (exactMatch) {
                    return item.id === id;
                } else {
                    return item.id.split(id).length > 1;
                }
            } else if (filteringType === baazaarFilteringTypes.stats) {
                if (parseInt(item.baseRarityScore) <= parseInt(minBRS)) {
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
            return filterSingleGotchi(item.gotchi);
        });
    };

    const getShownItems = (newPage) => {
        const itemsStart = ((newPage || page) - 1) * paginationConfigs.gotchiLimit;
        const newSelectedGoods = filteredLocalGoods.slice(itemsStart, itemsStart + paginationConfigs.gotchiLimit);
        setSelectedLocalGoods(newSelectedGoods);
    };

    const handleFindClick = () => {
        setSelectedLocalGoods([]);
        filterLocalGoods();
        sortLocalGoods();
        setPage(1);
        getShownItems();
    };

    useEffect(() => {
        let params = {
            skip: (page - 1) * paginationConfigs.limit,
            limit: paginationConfigs.limit,
            type: defaults.defaultGoodsType,
            ordering: defaults.defaultOrdering
        };

        if (resultsForType === listingTypes.aavegotchi) {
            params['limit'] = paginationConfigs.noLimit;
            setLastValidParams(params);
            getAllBaazaarItems(params);
        } else {
            params['limit'] = paginationConfigs.gotchiLimit;
            setLastValidParams(params);
            getBaazaarItems(params);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Grid className={classes.baazaar} container spacing={3}>
            <BaazaarSidebar
                loadBaazaarGoods={onLoadBaazaarItemsClick}
                defaultGoodsType={defaults.defaultGoodsType}
                defaultOrdering={defaults.defaultOrdering}
                setSelectedGoodsType={setSelectedGoodsType}
            />
            {
                resultsForType !== listingTypes.aavegotchi && resultsForType !== listingTypes.openedPortal ?
                    <BaazaarBody
                        goods={goods}
                        page={page}
                        limit={paginationConfigs.limit}
                        paginationIsVisible={paginationIsVisible}
                        onNextPageClick={onNextPageClick}
                        onPrevPageClick={onPrevPageClick}
                    />
                    : <BaazaarSortingBody
                        goods={selectedLocalGoods}
                        page={page}
                        limit={paginationConfigs.gotchiLimit}
                        paginationIsVisible={paginationIsVisible}
                        onNextPageClick={onLocalNextPageClick}
                        onPrevPageClick={onLocalPrevPageClick}
                        handleFindClick={handleFindClick}
                    />
            }
            <Backdrop className={classes.backdrop} open={backdropIsOpen}>
                <CircularProgress color='primary' />
            </Backdrop>
        </Grid>
    );
}
