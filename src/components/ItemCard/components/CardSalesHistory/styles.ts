import { alpha } from '@mui/system';
import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(() =>
    createStyles({
        historyWrapper: {
            color: '#fff',
            background: alpha('#000', 0.15),
            padding: '6px 8px',
            width: 'calc(100% + 16px)',
            margin: '0 -8px'
        },
        historyRow: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            '& + $historyRow': {
                marginTop: 4
            }
        },
        historyTitle: {
            marginRight: 8,
            color: 'orange'
        },
        historyInner: {
            fontWeight: 500,
            height: 20
        }
    })
);
