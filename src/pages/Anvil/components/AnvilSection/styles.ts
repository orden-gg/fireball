import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(() =>
    createStyles({
        anvilItem: {
            width: 260
        },
        anvilItemInfo: {
            color: '#fff',
            '& span': {
                fontWeight: 600,
                color: '#fbf941'
            }
        }
    })
);
