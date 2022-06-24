import { useContext } from 'react';
import { TextField } from '@mui/material';

import { BaazaarContext } from 'contexts/BaazaarContext';

import { styles } from './styles';

export function Name({ runFilterWatcher }: { runFilterWatcher: () => void }) {
    const classes = styles();

    const { name, setName } = useContext<any>(BaazaarContext);

    const onNameChange = (event: any): void => {
        setName(event.target.value);
        runFilterWatcher();
    };

    return (
        <TextField
            className={classes.smallInput}
            type='text'
            variant='outlined'
            fullWidth
            size={'small'}
            label={'Name'}
            defaultValue={name}
            onChange={onNameChange}
        />
    );
}
