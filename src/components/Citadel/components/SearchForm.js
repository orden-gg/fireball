import { useState } from 'react';
import { IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { InterfaceStyles } from '../styles';

export default function SearchForm({ onSearch, type, placeholder }) {
    const classes = InterfaceStyles();

    const [searchId, setSearchId] = useState(null);

    const onKeyPress = key => {
        if (key === 'Enter') {
            onSearch(type, searchId);
        }
    };

    return (
        <div className={classes.citadelSearch}>
            <TextField
                className={classes.citadelSearchField}
                placeholder={placeholder}
                variant="standard"
                onChange={event => setSearchId(event.target.value)}
                onKeyPress={event => onKeyPress(event.key)}
            />
            <IconButton onClick={() => onSearch(type, searchId)} className={classes.citadelInterfaceButton}>
                <SearchIcon />
            </IconButton>
        </div>
    );
}
