import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(() => createStyles({
    wrapper: {
        background: alpha('#000', .15),
        padding: 8,
        borderRadius: 4
    },
    inputs: {
        display: 'flex',
        justifyContent: 'space-between',
        '& > div': {
            width: 'calc(50% - 4px)'
        }
    },
    range: {
        padding: '0 8px',
        '& .MuiSlider-thumb': {
            pointerEvents: 'all !important'
        }
    },
    textField: {
        '& input::-webkit-outer-spin-button, input::-webkit-inner-spin-button': {
            WebkitAppearance: 'none',
            margin: 0
        },
        '& input[type=number]': {
            MozAppearance: 'textfield'
        }
    },
    title: {
        textAlign: 'center',
        fontWeight: 500
    }
}));
