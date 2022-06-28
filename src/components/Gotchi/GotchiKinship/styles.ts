import { alpha } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(() => createStyles({
    container: {
        minWidth: 219,
        textAlign: 'center',
        fontSize: 13
    },
    containerRow: {
        marginBottom: 4,
        '& span': {
            color: 'lime'
        }
    },
    gotchiKinship: {
        fontSize: 13,
        display: 'flex',
        alignItems: 'center',
        fontWeight: 500,
        cursor: 'default',
        padding: '2px 4px',
        borderRadius: 4,
        '&:hover': {
            background: alpha('#000', .1)
        }
    },
    gotchiKinshipIcon: {
        width: 12,
        marginRight: 2
    },
    row: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    rowTitle: {
        marginRight: 8
    },
    altar: {
        background: alpha('#fff', .04),
        borderRadius: 4,
        padding: 4,
        fontSize: 12,
        marginBottom: 4
    },
    tokensList: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    token: {
        display: 'flex',
        alignItems: 'center',
        fontSize: 10,
        textShadow: `1px 1px 0 ${alpha('#000', .7)}`
    },
    tokenIcon: {
        marginRight: 2
    },
    totalPrice: {
        background: alpha('#000', .1),
        borderRadius: 4,
        padding: '1px 4px',
        color: 'orange'
    },
    placeholder: {
        borderRadius: 4
    }
}));
