import { useContext, useEffect, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';

import _ from 'lodash';

import { DataReloadContextState } from 'shared/models';
import { DataReloadContext } from 'contexts/DataReloadContext';
import { Citadel } from 'components/Citadel/Citadel';
import { TheGraphApi } from 'api/thegraph.api';
import { LoginContext } from 'contexts/LoginContext';

import { styles } from './styles';

export function Map() {
    const classes = styles();

    const { activeAddress } = useContext<any>(LoginContext);
    const { reloadConfig } = useContext<DataReloadContextState>(DataReloadContext);

    const [isListedLoaded, setIsListedLoaded] = useState<boolean>(false);
    const [isOwnerLoaded, setIsOwnerLoaded] = useState<boolean>(false);
    const [realmGroups, setRealmGroups] = useState<any[]>([]);

    useEffect(() => {
        let isMounted = true;

        onLoadListedParcels(isMounted, true);

        return () => { isMounted = false };
    }, []);

    useEffect(() => {
        let mounted = true;

        onLoadOwnerParcels(mounted, true);

        return () => { mounted = false };
    }, [activeAddress]);

    useEffect(() => {
        if (reloadConfig.map.lastUpdated !== 0) {
            let isMounted = true;

            onLoadListedParcels(isMounted);
            onLoadOwnerParcels(isMounted);

            return () => { isMounted = false };
        }
    }, [reloadConfig.map.lastUpdated]);

    const onLoadListedParcels = (isMounted: boolean, shouldUpdateIsLoading?: boolean): void => {
        if (isMounted && shouldUpdateIsLoading) {
            setIsListedLoaded(false);
        }

        Promise.all([
            TheGraphApi.getParcelPriceByDirection({ size: 0, direction: 'asc' }),
            TheGraphApi.getParcelPriceByDirection({ size: 1, direction: 'asc' }),
            TheGraphApi.getParcelPriceByDirection({ size: 2, direction: 'asc' }),
            TheGraphApi.getParcelPriceByDirection({ size: 3, direction: 'asc' }),
            TheGraphApi.getAllListedParcels()
        ]).then(([humbleAsc, reasonableAsc, vSpaciousAsc, hSpaciousAsc, listedParcels]: [any, any, any, any, any]) => {
            if (isMounted) {
                const combinedParcels: any = getCombinedParcels(listedParcels);

                const listedRealmGroup: any = {
                    parcels: combinedParcels,
                    type: 'listed',
                    active: false,
                    /* eslint-disable-next-line react/jsx-key */
                    icons: [<MoneyOffIcon />, <AttachMoneyIcon />],
                    tooltip: 'Listed realm',
                    range: {
                        humble: { min: humbleAsc, max: 500 },
                        reasonable: { min: reasonableAsc, max: 700 },
                        spacious: { min: Math.min(vSpaciousAsc, hSpaciousAsc), max: 5000 }
                    }
                };

                setRealmGroups((groupsCache: any) => {
                    const groupsCacheCopy: any = _.cloneDeep(groupsCache);

                    groupsCacheCopy[0] = listedRealmGroup;

                    return groupsCacheCopy;
                });
            }
        })
        .catch(error => console.log(error))
        .finally(() => {
            if (isMounted) {
                setIsListedLoaded(true);
            }
        });
    };

    const onLoadOwnerParcels = (isMounted: boolean, shouldUpdateIsLoading?: boolean): void => {
        if (shouldUpdateIsLoading) {
            setIsOwnerLoaded(false);
        }

        if (activeAddress) {
            TheGraphApi.getRealmByAddress(activeAddress).then((ownerRealm: any) => {
                if (isMounted) {
                    const ownerRealmGroup = {
                        parcels: ownerRealm,
                        type: 'owner',
                        active: false,
                        animate: true,
                        /* eslint-disable-next-line react/jsx-key */
                        icons: [<VisibilityOffIcon />, <VisibilityIcon />],
                        tooltip: 'Owner realm'
                    };

                    setRealmGroups((groupsCache: any) => {
                        const groupsCacheCopy: any = _.cloneDeep(groupsCache);

                        groupsCacheCopy[1] = ownerRealmGroup;

                        return groupsCacheCopy;
                    });
                }
            })
            .catch(error => console.log(error))
            .finally(() => {
                if (isMounted) {
                    setIsOwnerLoaded(true);
                }
            });
        } else {
            setIsOwnerLoaded(true);
        }
    };

    const getCombinedParcels = (listedParcels: any[]): any => {
        return listedParcels.map((parcel: any) => {
            return {
                ...parcel.parcel,
                priceInWei: parcel.priceInWei,
                tokenId: parcel.tokenId,
                baazaarId: parcel.id,
                listings: [{
                    id: parcel.tokenId,
                    priceInWei: parcel.priceInWei,
                    __typename: 'ERC721Listing'
                }],
                historicalPrices: parcel.parcel.historicalPrices ? parcel.parcel.historicalPrices : []
            };
        });
    };

    return (
        <div className={classes.mapWrapper}>
            <Citadel
                className={classes.citadel}
                realmGroups={realmGroups}
                isLoaded={isOwnerLoaded && isListedLoaded}
            />
        </div>
    );
}
