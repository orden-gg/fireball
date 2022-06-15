import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(() => createStyles({
    iconWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100px',
        width: '100%',
        marginBottom: 4,
        '.tooltip-wearable &': {
            minHeight: 60
        },
        '.horizontal &': {
            margin: 'auto 0'
        }
    },
    icon: {
        width: '60%',
        maxHeight: 80,
        '.tooltip-wearable &': { // icon
            maxHeight: 50
        }
    }
}));
