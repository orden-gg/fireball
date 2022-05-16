import { useContext, useEffect, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import Citadel from 'components/Citadel/Citadel';

import thegraphApi from 'api/thegraph.api';
import { LoginContext } from 'contexts/LoginContext';
import styles from './styles';

export default function Map() {
    const { activeAddress } = useContext(LoginContext);
    const [listedRealm, setListedRealm] = useState({});
    const [isListedLoaded, setIsListedLoaded] = useState(false);
    const [ownerRealm, setOwnerRealm] = useState({});
    const [isOwnerLoaded, setIsOwnerLoaded] = useState(false);
    const classes = styles();

    const combineParcels = (listedParcels) => {
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
                historicalPrices: Boolean(parcel.parcel.historicalPrices) ? parcel.parcel.historicalPrices : []
            }
        });
    }

    useEffect(() => {
        let mounted = true;

        Promise.all([
            thegraphApi.getParcelPriceByDirection({ size: 0, direction: "desc", limit: 500 }),
            thegraphApi.getParcelPriceByDirection({ size: 0, direction: "asc" }),
            thegraphApi.getParcelPriceByDirection({ size: 1, direction: "desc", limit: 1000 }),
            thegraphApi.getParcelPriceByDirection({ size: 1, direction: "asc" }),
            thegraphApi.getParcelPriceByDirection({ size: 2, direction: "desc", limit: 3000 }),
            thegraphApi.getParcelPriceByDirection({ size: 2, direction: "asc" }),
            thegraphApi.getParcelPriceByDirection({ size: 3, direction: "desc", limit: 3000 }),
            thegraphApi.getParcelPriceByDirection({ size: 3, direction: "asc" }),
            thegraphApi.getAllListedParcels()
        ]).then(([humbleAsc, humbleDesc, reasonableAsc, reasonableDesc, vSpaciousAsc, vSpaciousDesc, hSpaciousAsc, hSpaciousDesc, listedParcels]) => {
            if (mounted) {
                const combined = combineParcels(listedParcels);

                setListedRealm({
                    parcels: combined,
                    type: 'listed',
                    active: false,
                    icons: [<VisibilityIcon />, <VisibilityOffIcon />],
                    tooltip: 'Listed realm',
                    range: {
                        humble: {min: humbleDesc, max: humbleAsc},
                        reasonable: {min: reasonableDesc, max: reasonableAsc},
                        spacious: {min: Math.min(hSpaciousDesc, vSpaciousDesc), max: Math.max(hSpaciousAsc, vSpaciousAsc)},
                    }
                });

                setIsListedLoaded(true);
            }
        })
        .catch(error => console.log(error))
        .finally(() => setIsListedLoaded(true));

        return () => mounted = false;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        let mounted = true;

        if (activeAddress) {
            setIsOwnerLoaded(false);

            thegraphApi.getRealmByAddress(activeAddress).then(ownerRealm => {
                if (mounted) {
                    setOwnerRealm({
                        parcels: ownerRealm,
                        type: 'owner',
                        active: false,
                        animate: true,
                        icons: [<VisibilityIcon />, <VisibilityOffIcon />],
                        tooltip: 'Owner realm'
                    });
                }
            })
            .catch(error => console.log(error))
            .finally(() => setIsOwnerLoaded(true));
        } else {
            setIsOwnerLoaded(true);
        }

        return () => mounted = false;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeAddress]);

    return (
        <div className={classes.mapWrapper}>
            <Citadel
                className={classes.citadel}
                realmGroups={[listedRealm, ownerRealm]}
                isLoaded={isOwnerLoaded && isListedLoaded}
            />
        </div>
    )
}
