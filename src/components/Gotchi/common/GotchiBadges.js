import React from 'react';
import styles from '../styles';

export default function GotchiBadges({ children, gotchi }) {
    const classes = styles();

    return (
        <div className={classes.gotchiBadges} key={`${gotchi.id}-badges`}>
            {children}
        </div>
    );
}
