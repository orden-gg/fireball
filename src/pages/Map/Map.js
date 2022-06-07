import { useContext, useEffect, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';

import Citadel from 'components/Citadel/Citadel';
import thegraphApi from 'api/thegraph.api';
import { LoginContext } from 'contexts/LoginContext';

import styles from './styles';

export default function Map() {
    const classes = styles();

    const { activeAddress } = useContext(LoginContext);

    const [listedRealm, setListedRealm] = useState({});
    const [isListedLoaded, setIsListedLoaded] = useState(false);
    const [ownerRealm, setOwnerRealm] = useState({});
    const [isOwnerLoaded, setIsOwnerLoaded] = useState(false);
    const [realmGroups, setRealmGroups] = useState([]);
    const [groupsLoaded, setGroupsLoaded] = useState(false);

    const combineParcels = listedParcels => {
        return listedParcels.map(parcel => {
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
            }
        });
    }

    useEffect(() => {
        let mounted = true;

        Promise.all([
            thegraphApi.getParcelPriceByDirection({ size: 0, direction: "asc" }),
            thegraphApi.getParcelPriceByDirection({ size: 1, direction: "asc" }),
            thegraphApi.getParcelPriceByDirection({ size: 2, direction: "asc" }),
            thegraphApi.getParcelPriceByDirection({ size: 3, direction: "asc" }),
            thegraphApi.getAllListedParcels()
        ]).then(([humbleAsc, reasonableAsc, vSpaciousAsc, hSpaciousAsc, listedParcels]) => {
            if (mounted) {
                const combined = combineParcels(listedParcels);

                setListedRealm({
                    parcels: combined,
                    type: 'listed',
                    active: false,
                    icons: [<MoneyOffIcon />, <AttachMoneyIcon />],
                    tooltip: 'Listed realm',
                    range: {
                        humble: {min: humbleAsc, max: 500},
                        reasonable: {min: reasonableAsc, max: 700},
                        spacious: {min: Math.min(vSpaciousAsc, hSpaciousAsc), max: 5000},
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

        return () => mounted = false;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        let mounted = true;

        setIsOwnerLoaded(false);

        if (activeAddress) {
            thegraphApi.getRealmByAddress(activeAddress).then(ownerRealm => {
                if (mounted) {
                    setOwnerRealm({
                        parcels: ownerRealm,
                        type: 'owner',
                        active: false,
                        animate: true,
                        icons: [<VisibilityOffIcon />, <VisibilityIcon />],
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

        return () => mounted = false;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeAddress]);

    useEffect(() => {
        if (isOwnerLoaded && isListedLoaded) {
            setRealmGroups([listedRealm, ownerRealm]);
            setGroupsLoaded(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOwnerLoaded, isListedLoaded]);

    return (
        <div className={classes.mapWrapper}>
            <Citadel
                className={classes.citadel}
                realmGroups={realmGroups}
                isLoaded={groupsLoaded}
            />
        </div>
    )
}
