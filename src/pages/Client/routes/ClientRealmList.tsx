import { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import HeightIcon from '@mui/icons-material/Height';
import HouseIcon from '@mui/icons-material/House';
import TimerIcon from '@mui/icons-material/Timer';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

import qs from 'query-string';

import { CustomParsedQuery, SortingListItem } from 'shared/models';
import { AlphaIcon, FomoIcon, FudIcon, KekIcon } from 'components/Icons/Icons';
import { ContentInner } from 'components/Content/ContentInner';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';
import { Parcel } from 'components/Items/Parcel/Parcel';
import { SortFilterPanel } from 'components/SortFilterPanel/SortFilterPanel';
import { ActionPane } from 'shared/ActionPane/ActionPane';
import { getUpgradeQueueByAddress } from 'api/installations.api';
import { TheGraphApi } from 'api';
import { getLastBlock, getFutureBlockTimestamp } from 'api/ethers.api';
import { ClientContext } from 'contexts/ClientContext';
import { filtersData } from 'data/filters.data';
import { FilterUtils, InstallationsUtils } from 'utils';

import { ClientRealmActions } from '../components/ClientRealmActions';
import { LoginContext } from 'contexts/LoginContext';

const sortings: SortingListItem[] = [
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
const initialFilters: any = {
    size: { ...filtersData.size, divider: true },
    altarLevel: { ...filtersData.altarLevel, divider: true },
    nextChannel: { ...filtersData.nextChannel },
    isUpgradeReady: { ...filtersData.isUpgradeReady, divider: true, class: 'no-padding-top' },
    district: { ...filtersData.district }
};
const queryParamsOrder: string[] = [
    initialFilters.size.queryParamKey,
    initialFilters.altarLevel.queryParamKey,
    initialFilters.nextChannel.queryParamKey,
    initialFilters.isUpgradeReady.queryParamKey,
    initialFilters.district.queryParamKey,
    'sort',
    'dir'
];

export function ClientRealmList() {
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
    } = useContext<any>(ClientContext);
    const { activeAddress } = useContext<any>(LoginContext);
    const [currentFilters, setCurrentFilters] = useState<any>({ ...initialFilters });
    const [modifiedRealm, setModifiedRealm] = useState<any[]>([]);
    const [loadingUpgrades, setLoadingUpgrades] = useState<boolean>(false);
    const [claimableUpgrades, setClaimableUpgrades] = useState<any[]>([]);
    const [activeFiltersCount, setActiveFiltersCount] = useState<number>(0);

    useEffect(() => {
        setRealmView('list');
    }, []);

    useEffect(() => {
        setCurrentFilters((currentFiltersCache: any) =>
            FilterUtils.getUpdateFiltersFromQueryParams(queryParams, currentFiltersCache)
        );

        const { sort, dir } = queryParams as CustomParsedQuery;

        if (sort && dir) {
            const key: any = sortings.find(sorting => sorting.paramKey === sort)?.key;

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
        FilterUtils.onFiltersUpdate(
            currentFilters,
            FilterUtils.getActiveFiltersCount,
            setActiveFiltersCount,
            updateFilterQueryParams
        );
    }, [currentFilters]);

    useEffect(() => {
        const paramKey: any = sortings.find(sorting => sorting.key === realmSorting.type)?.paramKey;

        updateSortQueryParams(paramKey, realmSorting.dir);
    }, [realmSorting]);

    useEffect(() => {
        const modifiedLendings = FilterUtils.getFilteredSortedItems({
            items: realm,
            filters: currentFilters,
            sorting: realmSorting,
            getFilteredItems: FilterUtils.getFilteredItems
        });

        setModifiedRealm(modifiedLendings);
    }, [currentFilters, realm, realmSorting]);

    const onSortingChange = useCallback((type: string, dir: string) => {
        setRealmSorting({ type, dir });
    }, [setRealmSorting]);

    const sorting: any = {
        sortingList: sortings,
        sortingDefaults: realmSorting,
        onSortingChange: onSortingChange
    };

    const updateSortQueryParams = useCallback((prop: string, dir: string) => {
        const params = { ...queryParams, sort: prop, dir };

        FilterUtils.updateQueryParams(history, location.pathname, qs, params, queryParamsOrder);
    }, [queryParams, history, location.pathname]);

    const updateFilterQueryParams = useCallback((filters: any) => {
        const params: any = FilterUtils.getUpdatedQueryParams(queryParams, filters);

        FilterUtils.updateQueryParams(history, location.pathname, qs, params, queryParamsOrder);
    }, [queryParams, history, location.pathname]);

    const onSetSelectedFilters = (key: string, selectedValue: any) => {
        FilterUtils.setSelectedFilters(setCurrentFilters, key, selectedValue);
    };

    const onResetFilters = useCallback(() => {
        FilterUtils.resetFilters(currentFilters, setCurrentFilters);
    }, [currentFilters]);

    const onExportData = useCallback(() => {
        FilterUtils.exportData(modifiedRealm, 'client_realm');
    }, [modifiedRealm]);

    const getRealmAdditionalData = useCallback(() => {
        const parcelIds: any[] = realm.map((parcel: any) => parcel.tokenId);

        setLoadingUpgrades(true);

        Promise.all([
            getRealmInfo(activeAddress),
            getRealmUpgradesQueue(activeAddress, parcelIds)
        ]).then(([realmInfo, realmUpgradesQueue]: [any, any]) => {
            const modifiedParcels = realm.map((parcel: any) => {
                const isParcelUpgrading: any = realmUpgradesQueue.find(upgrade => upgrade.parcelId === parcel.tokenId);
                const parcelInfo: any = realmInfo.find((info: any) => info.id === parcel.tokenId);

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

    const getRealmInfo = (owner: any): Promise<any> => {
        return TheGraphApi.getParcelsGotchiverseInfoByOwner(owner).then((res: any) => {
            return res.map((parcel: any) => {
                if (!parcel.equippedInstallations.length) {
                    return {
                        id: parcel.id,
                        lastChanneled: 0,
                        nextChannel: 0,
                        installations: []
                    };
                }

                const installations: any[] = parcel.equippedInstallations.map((inst: any) => ({
                    id: inst.id,
                    name: InstallationsUtils.getNameById(inst.id),
                    level: InstallationsUtils.getLevelById(inst.id),
                    type: InstallationsUtils.getTypeById(inst.id)
                }));

                const cooldown = InstallationsUtils.getCooldownByLevel(installations[0].level, 'seconds'); // TODO: select installation by altar type
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

    const getRealmUpgradesQueue = (owner: any, realmIds: any) => {
        return getUpgradeQueueByAddress(owner).then(async (res: any) => {

            const activeUpgrades = res
                .map((queue: any, i: number) => ({ ...queue, upgradeIndex: i })) // add indexes (needed for onUpgradesFinish function)
                .filter((queue: any) => realmIds.some(id => id === queue.parcelId && !queue.claimed)); // get only unclaimed upgrades

            if (activeUpgrades.length) {
                const lastBlock = await getLastBlock();

                const upgradesWithTimestamps: any[] = activeUpgrades.map((upgrade: any) => {
                    const currentBlock: any = upgrade.readyBlock;
                    const isUpgradeReady = currentBlock - lastBlock.number <= 0;
                    const timestamp = !isUpgradeReady ?
                        getFutureBlockTimestamp(lastBlock, currentBlock) : lastBlock.timestamp;

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
