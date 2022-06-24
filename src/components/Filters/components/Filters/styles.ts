import { createStyles, makeStyles } from '@mui/styles';

export const styles = makeStyles(() => createStyles({
    wrapper: {
        display: 'flex',
        flexDirection: 'column'
    },
    component: {
        padding: 12,
        '&.no-padding-top': {
            paddingTop: 0
        },
        '&.no-padding-bottom': {
            paddingBottom: 0
        }
    },
    divider: {
        width: '100%',
        borderBottomWidth: 2
    }
}));
