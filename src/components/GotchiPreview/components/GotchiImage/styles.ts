import { createStyles, makeStyles } from '@mui/styles';

export const gotchiImageStyles = makeStyles(theme => createStyles({
    gotchiSvg: {
        position: 'relative',
        cursor: 'ew-resize'
    },
    imageSlider: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        display: 'flex'
    },
    side: {
        flex: 1
    },
    sideLine: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        zIndex: 1,
        width: '25%',
        height: 3,
        transition: 'left .3s',
        backgroundColor: theme.palette.primary.main,
        '&.right': {
            left: '25%'
        },
        '&.back': {
            left: '50%'
        },
        '&.left': {
            left: '75%'
        }
    }
}));
