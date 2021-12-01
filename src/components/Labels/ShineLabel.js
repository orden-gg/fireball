import React from 'react';

import styles from './styles.js'

export default function ShineLabel({text}) {
    const classes = styles();

    return (
        <div className={classes.labelWrapper}>
            {text.split('').map((c, i) => (
                <span className={classes.label} key={i} style={{ animationDelay: `${-i * 0.04}s` }}>
                    {c === ' ' ? <>&nbsp;</> : c}
                </span>
            ))}
        </div>
    );
}