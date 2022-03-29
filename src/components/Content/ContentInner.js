import React from 'react';

import { ContentInnerStyles } from './style';

export default function ContentInner({ children }) {
    const classes = ContentInnerStyles();

    return (
        <div className={classes.content}>
            {children}
        </div>
    );
}
