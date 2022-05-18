import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';

import thegraphApi from 'api/thegraph.api';

import styles from './styles';
import ethersApi from 'api/ethers.api';
import { GhstTokenIcon } from 'components/Icons/Icons';

export default function ActiveListingButton({ item }) {
    const classes = styles();

    const [listing, setListing] = useState(null);
    const [listingLoading, setListingLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        setListingLoading(true);
        console.log(item)

        thegraphApi.getActiveListing(item.erc, item.id, item.type, item.category)
            .then(res => {
                if(mounted) {
                    console.log('res', res)
                    setListing(res);
                    setListingLoading(false);
                }
            })
            .catch(err => console.log(err));

        return () => mounted = false;
    }, [item]);

    if (listingLoading || !listing) {
        return null;
    }

    return (
        <Button
            className={classes.button}
            href={`https://app.aavegotchi.com/baazaar/${item.erc}/${listing.id}`}
            size='small'
            variant='contained'
            target='_blank'
        >
            {ethersApi.fromWei(listing.priceInWei)}
            <GhstTokenIcon height={16} width={16} />
        </Button>
    );
}
