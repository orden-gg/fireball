import { useContext, useEffect, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import { Citadel } from 'components/Citadel/Citadel';
import { TheGraphApi } from 'api/thegraph.api';
import { LoginContext } from 'contexts/LoginContext';

import { styles } from './styles';

export function Map() {
    const classes = styles();

    const { activeAddress } = useContext<any>(LoginContext);

    const [listedRealm, setListedRealm] = useState<any>({});
    const [isListedLoaded, setIsListedLoaded] = useState<boolean>(false);
    const [ownerRealm, setOwnerRealm] = useState<any>({});
    const [isOwnerLoaded, setIsOwnerLoaded] = useState<boolean>(false);
    const [realmGroups, setRealmGroups] = useState<any[]>([]);
    const [groupsLoaded, setGroupsLoaded] = useState<boolean>(false);

    const combineParcels = (listedParcels: any[]): any => {
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

    useEffect(() => {
        let mounted = true;

        Promise.all([
            TheGraphApi.getParcelPriceByDirection({ size: 0, direction: 'asc' }),
            TheGraphApi.getParcelPriceByDirection({ size: 1, direction: 'asc' }),
            TheGraphApi.getParcelPriceByDirection({ size: 2, direction: 'asc' }),
            TheGraphApi.getParcelPriceByDirection({ size: 3, direction: 'asc' }),
            TheGraphApi.getAllListedParcels()
        ]).then(([humbleAsc, reasonableAsc, vSpaciousAsc, hSpaciousAsc, listedParcels]: [any, any, any, any, any]) => {
            if (mounted) {
                const combined: any = combineParcels(listedParcels);

                setListedRealm({
                    parcels: combined,
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
                });
            }
        })
        .catch(error => console.log(error))
        .finally(() => {
            if (mounted) {
                setIsListedLoaded(true);
            }
        });

        return () => { mounted = false };
    }, []);

    useEffect(() => {
        let mounted = true;

        setIsOwnerLoaded(false);

        if (activeAddress) {
            TheGraphApi.getRealmByAddress(activeAddress).then((ownerRealm: any) => {
                if (mounted) {
                    setOwnerRealm({
                        parcels: ownerRealm,
                        type: 'owner',
                        active: false,
                        animate: true,
                        /* eslint-disable-next-line react/jsx-key */
                        icon: <VisibilityIcon />,
                        tooltip: 'Owner realm'
                    });
                }
            })
            .catch(error => console.log(error))
            .finally(() => {
                if (mounted) {
                    setIsOwnerLoaded(true);
                }
            });
        } else {
            setIsOwnerLoaded(true);
        }

        return () => { mounted = false };
    }, [activeAddress]);

    useEffect(() => {
        if (isOwnerLoaded && isListedLoaded) {
            setRealmGroups([listedRealm, ownerRealm]);
            setGroupsLoaded(true);
        }
    }, [isOwnerLoaded, isListedLoaded]);

    return (
        <div className={classes.mapWrapper}>
            <Citadel
                className={classes.citadel}
                realmGroups={realmGroups}
                isLoaded={groupsLoaded}
            />
        </div>
    );
}
