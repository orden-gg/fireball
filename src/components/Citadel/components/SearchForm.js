import React, { useState } from 'react';
import { IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { InterfaceStyles } from '../styles';

export default function SearchForm({ searchParcles }) {
    const classes = InterfaceStyles();

    const [searchId, setSearchId] = useState(null);

    const onKeyPress = key => {
        if(key === 'Enter') {
            searchParcles(searchId);
        }
    }

    return (
        <div className={classes.citadelSearch}>
            <TextField
                className={classes.citadelSearchField}
                placeholder="Search by id"
                variant="standard"
                onChange={ event => setSearchId(event.target.value) }
                onKeyPress={event => onKeyPress(event.key)}
            />
            <IconButton onClick={() => searchParcles(searchId)} className={classes.citadelInterfaceButton}>
                <SearchIcon />
            </IconButton>
        </div>
    );
}
