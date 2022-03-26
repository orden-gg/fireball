
import React from 'react';

import styles from './styles';

export default function GridContent({ children, sidebar }) {
    const classes = styles();

    return (
        <div
            className={classes.content}
        >
            <div className={classes.sidebar}>
                {sidebar}
            </div>
            <div className={classes.inner}>
                {children}
            </div>
        </div>
    );
}
