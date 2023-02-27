import { useState } from 'react';
import { IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { InterfaceStyles } from '../styles';

interface SearchFormProps {
  onSearch: (type: string, value: string) => void;
  type: string;
  placeholder: string;
}

export function SearchForm({ onSearch, type, placeholder }: SearchFormProps) {
  const classes = InterfaceStyles();

  const [searchId, setSearchId] = useState<string>('');

  const onKeyPress = (key: string) => {
    if (key === 'Enter') {
      onSearch(type, searchId);
    }
  };

  return (
    <div className={classes.citadelSearch}>
      <TextField
        className={classes.citadelSearchField}
        placeholder={placeholder}
        variant='standard'
        onChange={(event) => setSearchId(event.target.value)}
        onKeyPress={(event) => onKeyPress(event.key)}
      />
      <IconButton onClick={() => onSearch(type, searchId)} className={classes.citadelInterfaceButton}>
        <SearchIcon />
      </IconButton>
    </div>
  );
}
