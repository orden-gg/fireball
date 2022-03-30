import React from 'react';

import styles from './styles';

import kinshipIcon from 'assets/images/animated/gotchi-heart.gif';

export default function GotchiKinship({ gotchi }) {
    const classes = styles();

    return (
        <div className={classes.gotchiKinship}>
            <img className={classes.gotchiKinshipIcon} src={kinshipIcon} alt='gotchi-heart' />
            {gotchi.kinship}
        </div>
    );
}
