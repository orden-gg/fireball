import React, {useEffect, useState} from 'react';
import { Link, Typography } from '@mui/material';
import CallMade from '@mui/icons-material/CallMade';
import classNames from 'classnames';

import itemUtils from 'utils/itemUtils';

import { ERC1155InnerStyles, tooltipStyles, itemStyles, parselStyles } from '../../../styles';

export default function ParcelBaazaarLink({ parcel, isBaazaarCard, link, text }) {
    const classes = {
        ...itemStyles(),
        ...ERC1155InnerStyles(),
        ...tooltipStyles(),
        ...parselStyles()
    };

    const [name, setName] = useState('');
    const [size, setSize] = useState('');

    useEffect(() => {
        setName(parcel.parcelHash.replace(/-/g, ' '));
        setSize(itemUtils.getParcelSize(parcel.size));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Link
            href={
                isBaazaarCard ? `https://app.aavegotchi.com/baazaar/erc721/${link}` :
                    `${window.location.origin}/client/realm/parcel/${parcel.tokenId}`
            }
            target={isBaazaarCard ? '_blank' : '_self'}
            underline='none'
            className={classNames(classes.nameWrapper, 'two-lined')}
        >
            <Typography className={classNames(classes.name, classes.textHighlight, size)}>
                {text || name}
            </Typography>
            <CallMade className={classes.callMadeIcon} />
        </Link>
    )
}
