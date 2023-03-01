import { useEffect, useState } from 'react';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import VisibilityIcon from '@mui/icons-material/Visibility';

import _ from 'lodash';

import { TheGraphApi } from 'api/thegraph.api';

import { DataReloadType } from 'shared/constants';

// store
import * as fromDataReloadStore from 'core/store/data-reload';
import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import { getActiveAddress } from 'core/store/login';

import { Citadel } from 'components/Citadel/Citadel';

import { styles } from './styles';

export function Map() {
  const classes = styles();

  const dispatch = useAppDispatch();

  const lastManuallyTriggeredTimestamp: number = useAppSelector(fromDataReloadStore.getLastManuallyTriggeredTimestamp);
  const activeAddress = useAppSelector(getActiveAddress);

  const [isListedLoaded, setIsListedLoaded] = useState<boolean>(false);
  const [isOwnerLoaded, setIsOwnerLoaded] = useState<boolean>(false);
  const [realmGroups, setRealmGroups] = useState<any[]>([]);
  const [canBeUpdated, setCanBeUpdated] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    onLoadListedParcels(isMounted, true);

    dispatch(fromDataReloadStore.onSetReloadType(DataReloadType.Map));

    return () => {
      isMounted = false;

      dispatch(fromDataReloadStore.onSetReloadType(null));
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    onLoadOwnerParcels(mounted, true);

    return () => {
      mounted = false;
    };
  }, [activeAddress]);

  useEffect(() => {
    if (lastManuallyTriggeredTimestamp !== 0 && canBeUpdated) {
      let isMounted = true;

      onLoadListedParcels(isMounted);
      onLoadOwnerParcels(isMounted);

      return () => {
        isMounted = false;
      };
    }
  }, [lastManuallyTriggeredTimestamp]);

  const onLoadListedParcels = (isMounted: boolean, shouldUpdateIsLoading: boolean = false): void => {
    dispatch(fromDataReloadStore.setIsReloadDisabled(true));
    setIsListedLoaded(!shouldUpdateIsLoading);

    Promise.all([
      TheGraphApi.getParcelPriceByDirection({ size: 0, direction: 'asc' }),
      TheGraphApi.getParcelPriceByDirection({ size: 1, direction: 'asc' }),
      TheGraphApi.getParcelPriceByDirection({ size: 2, direction: 'asc' }),
      TheGraphApi.getParcelPriceByDirection({ size: 3, direction: 'asc' }),
      TheGraphApi.getAllListedParcels()
    ])
      .then(([humbleAsc, reasonableAsc, vSpaciousAsc, hSpaciousAsc, listedParcels]: [any, any, any, any, any]) => {
        if (isMounted) {
          const combinedParcels: any = getCombinedParcels(listedParcels);

          const listedRealmGroup: any = {
            parcels: combinedParcels,
            type: 'listed',
            active: false,
            /* eslint-disable-next-line react/jsx-key */
            icon: <AttachMoneyIcon />,
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
      .catch((error) => console.log(error))
      .finally(() => {
        if (isMounted) {
          setIsListedLoaded(true);
          dispatch(fromDataReloadStore.setIsReloadDisabled(false));
          dispatch(fromDataReloadStore.setLastUpdatedTimestamp(Date.now()));
          setCanBeUpdated(true);
        }
      });
  };

  const onLoadOwnerParcels = (isMounted: boolean, shouldUpdateIsLoading: boolean = false): void => {
    setIsOwnerLoaded(!shouldUpdateIsLoading);

    if (activeAddress) {
      TheGraphApi.getRealmByAddress(activeAddress)
        .then((ownerRealm: any) => {
          if (isMounted) {
            const ownerRealmGroup = {
              parcels: ownerRealm,
              type: 'owner',
              active: false,
              animate: true,
              /* eslint-disable-next-line react/jsx-key */
              icon: <VisibilityIcon />,
              tooltip: 'Owner realm'
            };

            setRealmGroups((groupsCache: any) => {
              const groupsCacheCopy: any = _.cloneDeep(groupsCache);

              groupsCacheCopy[1] = ownerRealmGroup;

              return groupsCacheCopy;
            });
          }
        })
        .catch((error) => console.log(error))
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
        listings: [
          {
            id: parcel.tokenId,
            priceInWei: parcel.priceInWei,
            __typename: 'ERC721Listing'
          }
        ],
        historicalPrices: parcel.parcel.historicalPrices ? parcel.parcel.historicalPrices : []
      };
    });
  };

  return (
    <div className={classes.mapWrapper}>
      <Citadel className={classes.citadel} realmGroups={realmGroups} isLoaded={isOwnerLoaded && isListedLoaded} />
    </div>
  );
}
