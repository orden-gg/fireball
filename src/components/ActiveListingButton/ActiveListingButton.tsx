import { useEffect, useState } from 'react';
import { Button } from '@mui/material';

import thegraphApi from 'api/thegraph.api';

import ethersApi from 'api/ethers.api';
import { GhstTokenIcon } from 'components/Icons/Icons';

interface ActiveListingButtonProps {
    item: any;
}

export function ActiveListingButton({ item }: ActiveListingButtonProps) {
    const [listing, setListing] = useState<any>(null);
    const [listingLoading, setListingLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        setListingLoading(true);

        thegraphApi.getActiveListing(item.erc, item.id, item.type, item.category)
            .then(res => {
                if (mounted) {
                    setListing(res);
                    setListingLoading(false);
                }
            })
            .catch(err => console.log(err));

        return () => { mounted = false };
    }, [item]);

    if (listingLoading || !listing) {
        return null;
    }

    return (
        <Button
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
