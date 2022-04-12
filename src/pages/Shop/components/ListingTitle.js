import React from 'react';
import { Typography } from '@mui/material';

import styles from './styles';

export default function ListingTitle({ icon, title }) {
    const classes = styles();

    return (
        <div className={classes.listingsTitleWrapper}>
            { icon }
            <Typography className={classes.listingsTitle} variant='subtitle1'>{title}</Typography>
        </div>
    )
}
