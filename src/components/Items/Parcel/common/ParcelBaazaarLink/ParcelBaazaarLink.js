import React, {useEffect, useState} from 'react';
import { Link, Typography } from '@mui/material';
import classNames from 'classnames';
import { ERC1155InnerStyles, tooltipStyles, itemStyles, parselStyles } from '../../../styles';

import CallMade from '@mui/icons-material/CallMade';
import itemUtils from '../../../../../utils/itemUtils';


export default function ParcelBaazaarLink({parcel, isBaazaarCard, link, text}) {
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
    }, []);

    return (
        <Link
            href={
                isBaazaarCard ? `https://aavegotchi.com/baazaar/erc721/${link}` :
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