import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';

const styles = makeStyles(() => ({
    gotchiLvl: {
        display: 'inline-flex',
        position: 'relative',
        backgroundColor: alpha('#000', .2),
        borderRadius: '50%',

        '.vertical &': {
            margin: '0 2px'
        }
    },
    gotchiLvlNumber: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        inset: 0,
        fontSize: 13,
        fontWeight: 500
    },
    gotchiLvlProggress: {
        color: '#FF1CFF'
    }
}));

export default styles;
