import { useContext, useEffect, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import Citadel from 'components/Citadel/Citadel';

import thegraphApi from 'api/thegraph.api';
import { LoginContext } from 'contexts/LoginContext';
import styles from './styles';

export default function Map() {
    const { activeAddress } = useContext(LoginContext);
    const [parcelsGroups, setParcelsGroups] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
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
        Promise.all([
            thegraphApi.getParcelPriceByDirection({ size: 0, direction: "desc", limit: 500 }),
            thegraphApi.getParcelPriceByDirection({ size: 0, direction: "asc" }),
            thegraphApi.getParcelPriceByDirection({ size: 1, direction: "desc", limit: 1000 }),
            thegraphApi.getParcelPriceByDirection({ size: 1, direction: "asc" }),
            thegraphApi.getParcelPriceByDirection({ size: 2, direction: "desc", limit: 3000 }),
            thegraphApi.getParcelPriceByDirection({ size: 2, direction: "asc" }),
            thegraphApi.getParcelPriceByDirection({ size: 3, direction: "desc", limit: 3000 }),
            thegraphApi.getParcelPriceByDirection({ size: 3, direction: "asc" }),
            thegraphApi.getAllListedParcels(),
            thegraphApi.getRealmByAddress(activeAddress)
        ]).then(([humbleAsc, humbleDesc, reasonableAsc, reasonableDesc, vSpaciousAsc, vSpaciousDesc, hSpaciousAsc, hSpaciousDesc, listedParcels, ownerRealm]) => {
            const combined = combineParcels(listedParcels);
            const groups = [];

            groups.push({
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

            if (ownerRealm.length > 0) {
                groups.push({
                    parcels: ownerRealm,
                    type: 'owner',
                    active: false,
                    animate: true,
                    icons: [<VisibilityIcon />, <VisibilityOffIcon />],
                    tooltip: 'Owner realm'
                })
            }

            setParcelsGroups(groups);

            setIsLoaded(true);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <div className={classes.mapWrapper}>
            <Citadel
                className={classes.citadel}
                parcelsGroups={parcelsGroups}
                isLoaded={isLoaded}
            />
        </div>
    )
}
