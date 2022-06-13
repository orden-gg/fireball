import { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import HeightIcon from '@mui/icons-material/Height';
import HouseIcon from '@mui/icons-material/House';
import TimerIcon from '@mui/icons-material/Timer';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

import qs from 'query-string';

import { AlphaIcon, FomoIcon, FudIcon, KekIcon } from 'components/Icons/Icons';
import { ContentInner } from 'components/Content/ContentInner';
import ItemsLazy from 'components/Lazy/ItemsLazy';
import Parcel from 'components/Items/Parcel/Parcel';
import SortFilterPanel from 'components/SortFilterPanel/SortFilterPanel';
import ActionPane from 'shared/ActionPane/ActionPane';
import installationsApi from 'api/installations.api';
import thegraphApi from 'api/thegraph.api';
import ethersApi from 'api/ethers.api';
import { ClientContext } from 'contexts/ClientContext';
import { filtersData } from 'data/filters.data';
import filtersUtils from 'utils/filtersUtils';
import installationsUtils from 'utils/installationsUtils';

import ClientRealmActions from '../components/ClientRealmActions';
import { LoginContext } from 'contexts/LoginContext';

const sortings = [
    {
        name: 'size',
        key: 'size',
        paramKey: 'size',
        tooltip: 'size',
        icon: <HeightIcon fontSize='small' />
    },
    {
        name: 'district',
        key: 'district',
        paramKey: 'district',
        tooltip: 'district',
        icon: <HouseIcon fontSize='small' />
    },
    {
        name: 'nextChannel',
        key: 'nextChannel',
        paramKey: 'nextChannel',
        tooltip: 'next channel',
        icon: <TimerIcon fontSize='small' />
    },
    {
        name: 'altarLevel',
        key: 'altarLevel',
        paramKey: 'altar',
        tooltip: 'altar level',
        icon: <AutoGraphIcon fontSize='small' />
    },
    {
        name: 'fudBoost',
        key: 'fudBoost',
        paramKey: 'fud',
        tooltip: 'fud boost',
        icon: <FudIcon height={18} width={18} />
    },
    {
        name: 'fomoBoost',
        key: 'fomoBoost',
        paramKey: 'fomo',
        tooltip: 'fomo boost',
        icon: <FomoIcon height={18} width={18} />
    },
    {
        name: 'alphaBoost',
        key: 'alphaBoost',
        paramKey: 'alpha',
        tooltip: 'alpha boost',
        icon: <AlphaIcon height={18} width={18} />
    },
    {
        name: 'kekBoost',
        key: 'kekBoost',
        paramKey: 'kek',
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
    const { activeAddress } = useContext(LoginContext);
    const [currentFilters, setCurrentFilters] = useState({ ...initialFilters });
    const [modifiedRealm, setModifiedRealm] = useState([]);
    const [loadingUpgrades, setLoadingUpgrades] = useState(false);
    const [claimableUpgrades, setClaimableUpgrades] = useState([]);
    const [activeFiltersCount, setActiveFiltersCount] = useState(0);

    useEffect(() => {
        setRealmView('list');
    }, []);

    useEffect(() => {
        setCurrentFilters(currentFiltersCache =>
            filtersUtils.getUpdateFiltersFromQueryParams(queryParams, currentFiltersCache)
        );

        const { sort, dir } = queryParams;

        if (sort && dir) {
            const key = sortings.find(sorting => sorting.paramKey === sort)?.key;

            onSortingChange(key, dir);
        }

        return () => {
            onResetFilters();
            setRealmSorting({ type: 'size', dir: 'desc' });
        };
    }, []);

    useEffect(() => {
        if (realm.length && !loadingRealm) {
            getRealmAdditionalData();
        }
    }, [loadingRealm]);

    useEffect(() => {
        filtersUtils.onFiltersUpdate(
            currentFilters,
            filtersUtils.getActiveFiltersCount,
            setActiveFiltersCount,
            updateFilterQueryParams
        );
    }, [currentFilters]);

    useEffect(() => {
        const paramKey = sortings.find(sorting => sorting.key === realmSorting.type)?.paramKey;

        updateSortQueryParams(paramKey, realmSorting.dir);
    }, [realmSorting]);

    useEffect(() => {
        const modifiedLendings = filtersUtils.getFilteredSortedItems({
            items: realm,
            filters: currentFilters,
            sorting: realmSorting,
            getFilteredItems: filtersUtils.getFilteredItems
        });

        setModifiedRealm(modifiedLendings);
    }, [currentFilters, realm, realmSorting]);

    const onSortingChange = useCallback((type, dir) => {
        setRealmSorting({ type, dir });
    }, [setRealmSorting]);

    const sorting = {
        sortingList: sortings,
        sortingDefaults: realmSorting,
        onSortingChange: onSortingChange
    };

    const updateSortQueryParams = useCallback((prop, dir) => {
        const params = { ...queryParams, sort: prop, dir };

        filtersUtils.updateQueryParams(history, location.pathname, qs, params, queryParamsOrder);
    }, [queryParams, history, location.pathname]);

    const updateFilterQueryParams = useCallback(filters => {
        const params = filtersUtils.getUpdatedQueryParams(queryParams, filters);

        filtersUtils.updateQueryParams(history, location.pathname, qs, params, queryParamsOrder);
    }, [queryParams, history, location.pathname]);

    const onSetSelectedFilters = (key, selectedValue) => {
        filtersUtils.setSelectedFilters(setCurrentFilters, key, selectedValue);
    };

    const onResetFilters = useCallback(() => {
        filtersUtils.resetFilters(currentFilters, setCurrentFilters);
    }, [currentFilters]);

    const onExportData = useCallback(() => {
        filtersUtils.exportData(modifiedRealm, 'client_realm');
    }, [modifiedRealm]);

    const getRealmAdditionalData = useCallback(() => {
        const parcelIds = realm.map(parcel => parcel.tokenId);

        setLoadingUpgrades(true);

        Promise.all([
            getRealmInfo(activeAddress),
            getRealmUpgradesQueue(activeAddress, parcelIds)
        ]).then(([realmInfo, realmUpgradesQueue]) => {
            const modifiedParcels = realm.map(parcel => {
                const isParcelUpgrading = realmUpgradesQueue.find(upgrade => upgrade.parcelId === parcel.tokenId);
                const parcelInfo = realmInfo.find(info => info.id === parcel.tokenId);

                return {
                    ...parcel,
                    channeling: parcelInfo,
                    nextChannel: parcelInfo.nextChannel,
                    altarLevel: parcelInfo.installations[0]?.level,
                    installations: parcelInfo.installations,
                    upgrading: isParcelUpgrading,
                    isUpgradeReady: Boolean(isParcelUpgrading?.ready)
                };
            });

            setRealm(modifiedParcels);
            setLoadingUpgrades(false);
        });
    }, [realm, setRealm, activeAddress]);

    const getRealmInfo = (owner) => {
        return thegraphApi.getParcelsGotchiverseInfoByOwner(owner).then(res => {
            return res.map(parcel => {
                if (!parcel.equippedInstallations.length) {
                    return {
                        id: parcel.id,
                        lastChanneled: 0,
                        nextChannel: 0,
                        installations: []
                    };
                }

                const installations = parcel.equippedInstallations.map(inst => ({
                    id: inst.id,
                    name: installationsUtils.getNameById(inst.id),
                    level: installationsUtils.getLevelById(inst.id),
                    type: installationsUtils.getTypeById(inst.id)
                }));

                const cooldown = installationsUtils.getCooldownByLevel(installations[0].level, 'seconds'); // TODO: select installation by altar type
                const lastChanneled = Number(parcel.lastChanneledAlchemica);
                const nextChannel = lastChanneled + cooldown;

                return {
                    id: parcel.id,
                    lastChanneled: lastChanneled,
                    nextChannel: Number(nextChannel),
                    cooldown: cooldown,
                    installations: installations
                };
            });
        });
    };

    const getRealmUpgradesQueue = (owner, realmIds) => {
        return installationsApi.getUpgradeQueueByAddress(owner).then(async res => {

            const activeUpgrades = res
                .map((queue, i) => ({ ...queue, upgradeIndex: i })) // add indexes (needed for onUpgradesFinish function)
                .filter(queue => realmIds.some(id => id === queue.parcelId && !queue.claimed)); // get only unclaimed upgrades

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
                    };
                });

                setClaimableUpgrades(
                    upgradesWithTimestamps.filter(queue => queue.ready).map(queue => queue.upgradeIndex)
                );

                return upgradesWithTimestamps;
            }

            return activeUpgrades;
        });
    };

    return (
        <>
            <SortFilterPanel
                sorting={sorting}
                itemsLength={modifiedRealm.length}
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
                    items={modifiedRealm}
                    component={(props) => <Parcel parcel={props} />}
                />
            </ContentInner>

            <ActionPane dataLoading={loadingRealm || loadingUpgrades}>
                <ClientRealmActions claimableList={claimableUpgrades} />
            </ActionPane>
        </>
    );
}
