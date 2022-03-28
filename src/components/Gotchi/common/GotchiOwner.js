import React from 'react';
import { Link } from '@mui/material';

import commonUtils from 'utils/commonUtils';

import styles from '../styles';

export default function GotchiOwner({ gotchi }) {
    const classes = styles();

    return (
        <Link
            className={classes.owner}
            href={`/client/?address=${gotchi.owner.id}`}
            target='_blank'
        >
            <p>{commonUtils.cutAddress(gotchi.owner.id)}</p>
        </Link>
    );
}
