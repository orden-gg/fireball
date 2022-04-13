import React from 'react';

import classNames from 'classnames';

import LazySorting from 'components/Filters/LazySorting';

import styles from './styles';

export default function SortFilterPanel({ sorting, itemsLength, placeholder }) {
    const classes = styles();

    return (
        <div className={classes.container}>
            <LazySorting {...sorting}/>

            { itemsLength > 0 &&
                <div className={classNames(classes.inner, classes.results)}>
                    <span>{itemsLength}</span>
                    <span className={classes.placeholder}>{placeholder}</span>
                </div>
            }
        </div>
    );
}
