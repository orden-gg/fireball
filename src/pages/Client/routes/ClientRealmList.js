import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import HeightIcon from '@mui/icons-material/Height';
import HouseIcon from '@mui/icons-material/House';
import TimerIcon from '@mui/icons-material/Timer';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

import qs from 'query-string';

import { AlphaIcon, FomoIcon, FudIcon, KekIcon } from 'components/Icons/Icons';
import ContentInner from 'components/Content/ContentInner';
import ItemsLazy from 'components/Lazy/ItemsLazy';
import Parcel from 'components/Items/Parcel/Parcel';
import SortFilterPanel from 'components/SortFilterPanel/SortFilterPanel';
import ActionPane from 'shared/ActionPane/ActionPane';
import installationsApi from 'api/installations.api';
import thegraphApi from 'api/thegraph.api';
import ethersApi from 'api/ethers.api';
import { ClientContext } from 'contexts/ClientContext';
import { filtersData } from 'data/filters.data';
import commonUtils from 'utils/commonUtils';
import filtersUtils from 'utils/filtersUtils';
import installationsUtils from 'utils/installationsUtils';

import ClientRealmActions from '../components/ClientRealmActions';

const sortings = [
    {
        name: 'size',
        key: 'size',
        tooltip: 'size',
        icon: <HeightIcon fontSize='small' />
    },
    {
        name: 'district',
        key: 'district',
        tooltip: 'district',
        icon: <HouseIcon fontSize='small' />
    },
    {
        name: 'nextChannel',
        key: 'nextChannel',
        tooltip: 'next channel',
        icon: <TimerIcon fontSize='small' />
    },
    {
        name: 'altarLevel',
        key: 'altarLevel',
        tooltip: 'altar level',
        icon: <AutoGraphIcon fontSize='small' />
    },
    {
        name: 'fudBoost',
        key: 'fudBoost',
        tooltip: 'fud boost',
        icon: <FudIcon height={18} width={18} />
    },
    {
        name: 'fomoBoost',
        key: 'fomoBoost',
        tooltip: 'fomo boost',
        icon: <FomoIcon height={18} width={18} />
    },
    {
        name: 'alphaBoost',
        key: 'alphaBoost',
        tooltip: 'alpha boost',
        icon: <AlphaIcon height={18} width={18} />
    },
    {
        name: 'kekBoost',
        key: 'kekBoost',
        tooltip: 'kek boost',
        icon: <KekIcon height={18} width={18} />
    }
];
const initialFilters = {
    size: { ...filtersData.size, divider: true },
    altarLevel: { ...filtersData.altarLevel, divider: true },
    nextChannel: { ...filtersData.nextChannel },
    isUpgradeReady: { ...filtersData.isUpgradeReady, divider: true, class: 'no-padding-top' },
    district: { ...filtersData.district }
};
const queryParamsOrder = [
    initialFilters.size.queryParamKey,
    initialFilters.altarLevel.queryParamKey,
    initialFilters.nextChannel.queryParamKey,
    initialFilters.isUpgradeReady.queryParamKey,
    initialFilters.district.queryParamKey,
    'sort',
    'dir'
];

export default function ClientRealmList() {
    const history = useHistory();
    const location = useLocation();
    const queryParams = qs.parse(location.search, { arrayFormat: 'comma' });

    const {
        realm,
        setRealm,
        realmSorting,
        setRealmSorting,
        loadingRealm,
        setRealmView
    } = useContext(ClientContext);
    const [currentFilters, setCurrentFilters] = useState({...initialFilters});
    const [modifiedRealm, setModifiedRealm] = useState([]);
    const [isSortingChanged, setIsSortingChanged] = useState(false);
    const [isFiltersApplied, setIsFiltersApplied] = useState(false);
    const [loadingUpgrades, setLoadingUpgrades] = useState(false);
    const [claimableUpgrades, setClaimableUpgrades] = useState([]);
    const [activeFiltersCount, setActiveFiltersCount] = useState(0);

    useEffect(() => {
        setRealmView('list');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setCurrentFilters(currentFiltersCache =>
            filtersUtils.getUpdateFiltersFromQueryParams(queryParams, currentFiltersCache)
        );

        const { sort, dir } = queryParams;

        if (sort && dir) {
            updateSorting(sort, dir);
        }

        return () => {
            onResetFilters();
            setRealmSorting({ type: 'size', dir: 'desc' });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (realm.length && !loadingRealm) {
            getRealmAdditionalData();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadingRealm]);

    useEffect(() => {
        const activeFilters = Object.entries(currentFilters).filter(([_, filter]) => filter.isFilterActive);

        if (activeFilters.length > 0) {
            const filtersCount = filtersUtils.getActiveFiltersCount(currentFilters);

            setActiveFiltersCount(filtersCount);
            setIsFiltersApplied(true);
        } else {
            setActiveFiltersCount(0);
            setIsFiltersApplied(false);
        }

        updateQueryParams(currentFilters);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentFilters]);

    useEffect(() => {
        setModifiedRealm(modifiedGotchisCache => filtersUtils.getFilteredSortedItems({
            items: realm,
            itemsCache: modifiedGotchisCache,
            filters: currentFilters,
            isFiltersApplied,
            isFiltersAppliedSetter: setIsFiltersApplied,
            sorting: realmSorting,
            isSortingChanged,
            getFilteredItems: filtersUtils.getFilteredItems
        }));
    }, [currentFilters, realm, isFiltersApplied, isSortingChanged, realmSorting]);

    useEffect(() => {
        const sortedItems = commonUtils.basicSort(realm, realmSorting.type, realmSorting.dir);

        setRealm([...sortedItems]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadingRealm, realmSorting]);

    const updateSorting = useCallback((prop, dir) => {
        setIsSortingChanged(true);
        setRealmSorting({ type: prop, dir });
    }, [setRealmSorting]);

    const updateSortQueryParams = useCallback((prop, dir) => {
        history.push({
            path: location.pathname,
            search: qs.stringify({...queryParams, sort: prop, dir }, {
                sort: (a, b) => queryParamsOrder.indexOf(a) - queryParamsOrder.indexOf(b),
                arrayFormat: 'comma'
            })
        });
    }, [queryParams, history, location.pathname]);

    const onSortingChange = useCallback((prop, dir) => {
        updateSorting(prop, dir);
        updateSortQueryParams(prop, dir);
    }, [updateSorting, updateSortQueryParams]);

    const sorting = {
        sortingList: sortings,
        sortingDefaults: realmSorting,
        onSortingChange: onSortingChange
    };

    const updateQueryParams = useCallback(filters => {
        const params = filtersUtils.getUpdatedQueryParams(queryParams, filters);

        history.push({
            path: location.pathname,
            search: qs.stringify(params, {
                sort: (a, b) => queryParamsOrder.indexOf(a) - queryParamsOrder.indexOf(b),
                arrayFormat: 'comma'
            })
        });
    }, [queryParams, history, location.pathname]);

    const onSetSelectedFilters = (key, selectedValue) => {
        setCurrentFilters(currentFiltersCache => {
            const cacheCopy = {...currentFiltersCache};

            if (!cacheCopy[key].getIsFilterValidFn(selectedValue)) {
                cacheCopy[key].resetFilterFn(cacheCopy[key]);
            } else {
                cacheCopy[key].updateFromFilterFn(cacheCopy[key], selectedValue);
            }

            return cacheCopy;
        });
    }

    const onResetFilters = useCallback(() => {
        const currentFiltersCopy = {...currentFilters};

        Object.entries(currentFiltersCopy).forEach(([_, filter]) => {
            filter.resetFilterFn(filter);
        });

        setCurrentFilters({...currentFiltersCopy});
    }, [currentFilters]);

    const onExportData = useCallback(() => {
        filtersUtils.exportData(modifiedRealm, 'client_realm');
    }, [modifiedRealm]);

    const getRealm = useCallback(() => {
        return (isSortingChanged || isFiltersApplied) ? modifiedRealm : realm;
    }, [isSortingChanged, isFiltersApplied, modifiedRealm, realm]);

    const getRealmAdditionalData = useCallback(() => {
        const parcelIds = realm.map(parcel => parcel.tokenId);

        setLoadingUpgrades(true);

        Promise.all([
            getRealmInfo(parcelIds),
            getRealmUpgradesQueue(parcelIds),
        ]).then(([realmInfo, realmUpgradesQueue]) => {
            const modifiedParcels = realm.map((parcel, index) => {
                const parcelUpgrading = realmUpgradesQueue.find(upgrade => upgrade.parcelId === parcel.tokenId);

                return {
                    ...parcel,
                    channeling: realmInfo[index],
                    nextChannel: realmInfo[index].nextChannel,
                    altarLevel: realmInfo[index].installations[0].level,
                    installations: realmInfo[index].installations,
                    upgrading: parcelUpgrading ? parcelUpgrading : undefined,
                    isUpgradeReady: parcelUpgrading?.ready ? true : false
                };
            });

            setRealm(modifiedParcels);
            setLoadingUpgrades(false);
        });
    }, [realm, setRealm]);

    const getRealmInfo = (realmIds) => {
        return thegraphApi.getParcelsGotchiverseInfo(realmIds).then(res => {
            return res.map(parcel => {
                const installations = parcel.installations.map(inst => ({
                    id: inst.id,
                    name: installationsUtils.getNameById(inst.id),
                    level: installationsUtils.getLevelById(inst.id),
                    type: installationsUtils.getTypeById(inst.id)
                }));
                const cooldown = installationsUtils.getCooldownByLevel(installations[0].level, 'seconds'); // TODO: select installation by altar type
                const nextChannel = parcel.lastChanneled + cooldown;

                return {
                    lastChanneled: parcel.lastChanneled,
                    nextChannel: nextChannel,
                    cooldown: cooldown,
                    installations: installations
                };
            });
        })
    }

    const getRealmUpgradesQueue = (realmIds) => {
        return installationsApi.getAllUpgradeQueue().then(async res => {
            const activeUpgrades = res
                .map((que, i) => ({ ...que, upgradeIndex: i })) // add indexes (needed for onUpgradesFinish function)
                .filter(que => realmIds.some(id => id === que.parcelId && !que.claimed)); // get only unclaimed upgrades

            if (activeUpgrades.length) {
                const lastBlock = await ethersApi.getLastBlock();

                const upgradesWithTimestamps = activeUpgrades.map(upgrade => {
                    const currentBlock = upgrade.readyBlock;
                    const isUpgradeReady = currentBlock - lastBlock.number <= 0;
                    const timestamp = !isUpgradeReady ?
                        ethersApi.getFutureBlockTimestamp(lastBlock, currentBlock) : lastBlock.timestamp;

                    return {
                        ...upgrade,
                        timestamp: timestamp,
                        ready: isUpgradeReady
                    }
                });

                setClaimableUpgrades(
                    upgradesWithTimestamps.filter(que => que.ready).map(que => que.upgradeIndex)
                );
                return upgradesWithTimestamps;
            }

            return activeUpgrades;
        });
    }

    return (
        <>
            <SortFilterPanel
                sorting={sorting}
                itemsLength={getRealm().length}
                placeholder={
                    <KekIcon width={20} height={20} />
                }
                filters={initialFilters}
                isShowFilters={true}
                setSelectedFilters={onSetSelectedFilters}
                resetFilters={onResetFilters}
                exportData={onExportData}
                filtersCount={activeFiltersCount}
            />

            <ContentInner dataLoading={loadingRealm}>
                <ItemsLazy
                    items={getRealm()}
                    component={(props) => <Parcel parcel={props} />}
                />
            </ContentInner>

            <ActionPane dataLoading={loadingRealm || loadingUpgrades}>
                <ClientRealmActions claimableList={claimableUpgrades} />
            </ActionPane>
        </>
    );
}
