import { useContext } from 'react';
import { TextField } from '@mui/material';

import { BaazaarContext } from 'contexts/BaazaarContext';

import { styles } from './styles';

export function Id({ runFilterWatcher }: { runFilterWatcher: () => void }) {
    const classes = styles();

    const { id, setId } = useContext<any>(BaazaarContext);

    const onIdChange = (event: any): void => {
        setId(event.target.value);
        runFilterWatcher();
    };

    return (
        <TextField
            className={classes.smallInput}
            type='text'
            variant='outlined'
            fullWidth
            size={'small'}
            label={'Id'}
            defaultValue={id}
            onChange={onIdChange}
        />
    );
}
