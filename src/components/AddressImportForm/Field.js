import { TextField, IconButton } from '@mui/material';
import { useStyles } from './styles';

import CloseIcon from '@mui/icons-material/Close';

export default function Field({type, value, handleInputChange}) {
    const classes = useStyles();

    const resetValue = () => {
        handleInputChange(type, '');
    }

    return (
        <TextField
            type='text'
            variant='outlined'
            fullWidth
            value={value || ''}
            size={'small'}
            label={type}
            className={classes.addressField}
            onChange={(event) => {
                return handleInputChange(type, event.target.value)
            }}
            InputProps={{
                endAdornment: <IconButton size={'small'} onClick={resetValue}>
                    <CloseIcon/>
                </IconButton>
            }}
        />
    )
}