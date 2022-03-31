import React from 'react';

import kinshipIcon from 'assets/images/animated/gotchi-heart.gif';

import styles from './styles';

export default function GotchiKinship({ gotchi }) {
    const classes = styles();

    return (
        <div className={classes.gotchiKinship}>
            <img className={classes.gotchiKinshipIcon} src={kinshipIcon} alt='gotchi-heart' />
            {gotchi.kinship}
        </div>
    );
}
