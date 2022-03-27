import React from 'react';
import { Typography } from '@mui/material';

import styles from '../styles';

export default function ListingTitle({ src, alt, title }) {
    const classes = styles();

    return (
        <div className={classes.listingsTitleWrapper}>
            <img className={classes.listingsTitleImg} src={src} alt={alt}/>
            <Typography className={classes.listingsTitle} variant='subtitle1'>{title}</Typography>
        </div>
    )
}
