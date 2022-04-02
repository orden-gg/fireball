import React, { useState } from 'react';
import { Alert, AlertTitle, Autocomplete, Chip, Link, TextField } from '@mui/material';

import styles from './styles';
import collaterals from 'data/collaterals';

export default function GotchiFilters({ gotchis, setGotchis, defaultSorting }) {
    const classes = styles();

    const [value, setValue] = useState([]);

    return (
        <>
            <div className={classes.section}>

                <Autocomplete
                    multiple
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    // id='tags-standart'
                    options={collaterals}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            size='small'
                            label='Collaterals'
                        />
                    )}
                    renderTags={(tagValue, getTagProps) =>
                        tagValue.map((option, index) => (
                            <Chip
                                label={option.name}
                                size='small'
                                {...getTagProps({ index })}
                            />
                        ))
                    }
                />
            </div>

            <div className={classes.section}>
                <Alert severity='info'>
                    <AlertTitle>Note!</AlertTitle>
                    More complex filters are <strong>comming soon!</strong>. This page will be guild-focused.<br />
                    To achive best experience
                    <Link
                        href='https://fireball-gg.notion.site/How-to-add-guild-to-fireball-gg-a2bec3bd315c4d42961bc0148bb17c26'
                        target='_blank'
                        style={{ margin: '0 6px', color: 'cyan', textDecoration: 'underline' }}
                    ><strong>add your guild</strong></Link>
                    to our data!
                </Alert>
            </div>
        </>
    )
}
