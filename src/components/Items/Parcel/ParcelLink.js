import React, {useEffect, useState} from 'react';
import { Link, Typography } from '@mui/material';
import CallMade from '@mui/icons-material/CallMade';
import classNames from 'classnames';

import itemUtils from 'utils/itemUtils';

import { ERC1155InnerStyles, tooltipStyles, itemStyles, parselStyles } from '../styles';

export default function ParcelLink({ parcel }) {
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
            href={`/parcel/${parcel.tokenId}`}
            target={'_blank'}
            underline='none'
            className={classNames(classes.nameWrapper, 'two-lined', 'parcel-name')}
        >
            <Typography className={classNames(classes.name, classes.textHighlight, size)}>
                {name}
            </Typography>
            <CallMade className={classes.callMadeIcon} />
        </Link>
    )
}
